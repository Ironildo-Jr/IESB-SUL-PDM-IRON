import { useContext, useState } from "react";
import {
  Alert,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import CategoryItem from "./CategoryItem";
import DatePicker from "./DatePicker";
import { MoneyContext } from "../contexts/GlobalState";
import api from "../services/api";
import { globalStyles } from "../styles/globalStyles";
import { setAsyncStorage } from "../utils/AsyncStorage";
import { colors } from "../constants/colors";
import CategoryPicker from "./CategoryPicker";
import CurrencyInput from "./CurrencyInput";
import DescriptionInput from "./DescriptionInput";
import Button from "./Button";

export default function TransactionItem({
  id,
  category,
  date,
  description,
  value,
  setTransactions,
  transactions,
}) {
  const [showModal, setShowModal] = useState(false);
  const [, , categories] = useContext(MoneyContext);

  const computeInitialCategoryValue = () => {
    if (typeof category === "object" && category !== null) {
      // prefer id if categories list has ids, otherwise fall back to name
      const hasIdInCategories = categories.some((c) => c.id !== undefined && c.id !== null);
      return hasIdInCategories ? String(category.id) : String(category.name);
    }
    if (typeof category === "number") {
      return String(category);
    }
    return category;
  };

  const [editForm, setEditForm] = useState({
    id,
    category: computeInitialCategoryValue(),
    date: date ? new Date(date) : new Date(),
    description,
    value: Number(value),
  });

  const categoryName = typeof category === "object" && category !== null ? category.name : String(category);

  const valueStyle = categoryName === "income" ? globalStyles.positiveText : globalStyles.negativeText;

  const saveTransaction = async () => {
    if (
      !editForm.description ||
      !editForm.value ||
      !editForm.date ||
      !editForm.category
    ) {
      Alert.alert(
        "Atenção",
        "Preencha todos os campos para salvar a transação.",
      );
      return;
    }

    try {
      let payload = null;
      try { console.log('[TransactionItem] save payload (preparing) editForm:', editForm); } catch (e) {}

      let categoryIdToSend = Number(editForm.category);
      if (Number.isNaN(categoryIdToSend)) {
        const found = categories.find((c) => c.name === editForm.category);
        categoryIdToSend = found ? found.id : NaN;
      }

      payload = {
        description: editForm.description,
        value: Number(editForm.value),
        // ensure date is YYYY-MM-DD string
        date: editForm.date instanceof Date ? editForm.date.toISOString().slice(0, 10) : editForm.date,
        categoryId: categoryIdToSend,
      };
      try { console.log('[TransactionItem] create/update payload:', payload); } catch (e) {}

      const updated = await api.updateTransaction(id, payload);

      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === id ? updated : transaction,
      );

      setTransactions(updatedTransactions);
      await setAsyncStorage("transactions", updatedTransactions);
      setShowModal(false);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível salvar a transação.\n" + (err.message || ""));
    }
  };

  const deleteTransaction = async () => {
    try {
      await api.deleteTransaction(id);
      const updatedTransactions = transactions.filter((transaction) => transaction.id !== id);
      setTransactions(updatedTransactions);
      await setAsyncStorage("transactions", updatedTransactions);
      setShowModal(false);
    } catch (err) {
      Alert.alert("Erro", "Não foi possível excluir a transação.\n" + (err.message || ""));
    }
  };

  return (
    <>
      <TouchableOpacity onLongPress={() => setShowModal(true)}>
        <View style={styles.itemContainer}>
          <CategoryItem category={categoryName} />
          <View style={styles.textContainer}>
            <Text style={globalStyles.secondaryText}>
              {new Date(date).toLocaleDateString("pt-BR")}
            </Text>
            <View style={styles.bottomLineContainer}>
              <Text style={globalStyles.primaryText}>{description}</Text>
              <Text style={valueStyle}>
                {value.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </Text>
            </View>
          </View>
        </View>
        <View style={globalStyles.line} />
      </TouchableOpacity>

      <Modal visible={showModal} transparent animationType="slide">
        <View style={globalStyles.overlay}>
          <View style={globalStyles.modalContainer}>
            <Text style={globalStyles.modalTitle}>Editar transação</Text>
            <DescriptionInput
              form={editForm}
              setForm={setEditForm}
              valueInputRef={null}
            />
            <CurrencyInput
              form={editForm}
              setForm={setEditForm}
              valueInputRef={null}
            />
            <DatePicker form={editForm} setForm={setEditForm} />
            <CategoryPicker form={editForm} setForm={setEditForm} />
            <View style={styles.modalActions}>
              <Button
                style={styles.modalButton}
                onPress={deleteTransaction}
                color={colors.negativesText}
              >
                Excluir
              </Button>
              <Button
                style={styles.modalButton}
                onPress={saveTransaction}
                color={colors.primary}
              >
                Salvar
              </Button>
            </View>
            <Pressable
              onPress={() => setShowModal(false)}
              style={globalStyles.closeButton}
            >
              <Text style={globalStyles.closeButtonText}>Fechar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 4,
  },
  textContainer: {
    display: "flex",
    flex: 1,
    flexDirection: "column",
    marginLeft: 12,
    paddingVertical: 8,
  },
  bottomLineContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalForm: {
    gap: 12,
    borderRadius: 16,
    padding: 20,
    backgroundColor: colors.background,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 16,
    color: colors.primaryText,
  },
  modalActions: {
    flexDirection: "row",
    gap: 8,
  },
  modalButton: {
    flex: 1,
  },
});
