import { useContext } from "react";
import { Tabs } from "expo-router";
import { StyleSheet, TouchableOpacity, View, Text, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { AuthContext } from "../../contexts/AuthContext";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      "Sair",
      "Deseja realmente sair da aplicação?",
      [
        {
          text: "Cancelar",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Sair",
          onPress: async () => {
            await logout();
            router.replace("/login");
          },
          style: "destructive",
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: colors.primary },
        headerTintColor: colors.primaryContrast,
        headerTitleStyle: { fontSize: 22 },
        headerTitleAlign: "center",
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.inactive,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          height: 60,
          paddingTop: 5,
          bottom: insets.bottom,
          backgroundColor: colors.background,
        },
        tabBarButton: (props) => (
          <TouchableOpacity {...props} activeOpacity={0.8} />
        ),
        headerRight: () => (
          <TouchableOpacity
            onPress={handleLogout}
            style={styles.logoutButton}
          >
            <MaterialIcons name="logout" size={24} color={colors.primaryContrast} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: `Bem-vindo, ${user?.name}!`,
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="attach-money" size={28} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="add-transactions"
        options={{
          title: "Adicionar Transação",
          tabBarLabel: "",
          tabBarIcon: () => (
            <View style={styles.addButton}>
              <MaterialIcons
                name="add"
                size={40}
                color={colors.primaryContrast}
              />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="summary"
        options={{
          title: "Resumo",
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="pie-chart" size={28} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  addButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 64,
    width: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
  },
  logoutButton: {
    marginRight: 16,
    padding: 8,
  },
});
