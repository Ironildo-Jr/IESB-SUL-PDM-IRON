import { useContext, useState } from "react";
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { globalStyles } from "../styles/globalStyles";
import Button from "../components/Button";
import { AuthContext } from "../contexts/AuthContext";

export default function LoginScreen() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await login(name, password);
      setName("");
      setPassword("");
    } catch (error) {
      Alert.alert("Erro no login", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    try {
      setLoading(true);
      await login("Visitante", "1234");
      setName("");
      setPassword("");
    } catch (error) {
      Alert.alert("Erro no login", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/icon.png")}
              style={styles.logo}
            />
            <Text style={styles.title}>Gestão Financeira</Text>
            <Text style={styles.subtitle}>Gerencie suas transações</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={globalStyles.input}
              placeholder="Digite seu nome"
              placeholderTextColor={colors.secondaryText}
              value={name}
              onChangeText={setName}
            />

            <TextInput
              style={globalStyles.input}
              placeholder="Digite sua senha"
              placeholderTextColor={colors.secondaryText}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />

            <Button onPress={handleLogin}>Entrar</Button>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.line} />
            </View>

            <Button
              color={colors.secondaryText}
              onPress={handleGuestLogin}
            >
              Entrar como Visitante
            </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    justifyContent: "center",
    gap: 80,
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: "center",
    gap: 12,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: colors.primaryText,
  },
  subtitle: {
    fontSize: 20,
    color: colors.secondaryText,
  },
  formContainer: {
    gap: 16,
    width: "100%",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: colors.secondaryText,
    opacity: 0.3,
  },
  dividerText: {
    color: colors.secondaryText,
    fontSize: 18,
  },
});
