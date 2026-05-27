import { useContext, useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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

  const handleDemoLogin = async () => {
    try {
      setLoading(true);
      await login("Demo User", "demo123");
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
      behavior="padding"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>💰</Text>
            <Text style={styles.title}>Gestor Financeiro</Text>
            <Text style={styles.subtitle}>Gerencie suas transações</Text>
          </View>

          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={globalStyles.inputLabel}>Nome</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Digite seu nome"
                placeholderTextColor={colors.secondaryText}
                value={name}
                onChangeText={setName}
                editable={!loading}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={globalStyles.inputLabel}>Senha</Text>
              <TextInput
                style={globalStyles.input}
                placeholder="Digite sua senha"
                placeholderTextColor={colors.secondaryText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                editable={!loading}
              />
              <Text style={styles.hint}>Mínimo 3 caracteres</Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                onPress={handleLogin}
                disabled={loading || !name || !password}
              >
                {loading ? "Entrando..." : "Entrar"}
              </Button>
            </View>

            <View style={styles.divider}>
              <View style={styles.line} />
              <Text style={styles.dividerText}>ou</Text>
              <View style={styles.line} />
            </View>

            <TouchableOpacity
              style={styles.demoButton}
              onPress={handleDemoLogin}
              disabled={loading}
            >
              <Text style={styles.demoButtonText}>Entrar com Demo</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Demo: use qualquer nome e senha com 3+ caracteres
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  inner: {
    flex: 1,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 60,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: colors.primaryText,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: colors.secondaryText,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    gap: 16,
  },
  inputGroup: {
    gap: 8,
  },
  hint: {
    fontSize: 12,
    color: colors.secondaryText,
    marginTop: 4,
  },
  buttonContainer: {
    marginTop: 8,
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 16,
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
    fontSize: 14,
  },
  demoButton: {
    backgroundColor: colors.background,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: colors.primary,
    alignItems: "center",
  },
  demoButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    color: colors.secondaryText,
    textAlign: "center",
  },
});
