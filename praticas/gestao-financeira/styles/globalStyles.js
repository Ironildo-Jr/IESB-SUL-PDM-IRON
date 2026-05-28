import { StyleSheet } from "react-native";
import { colors } from "../constants/colors";

export const globalStyles = StyleSheet.create({
  screenContainer: {
    display: "flex",
    flex: 1,
    paddingTop:20,
  },
  content: {
    gap: 12,
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  input: {
    width: "100%",
    height: 40,
    paddingHorizontal: 16,
    borderColor: colors.secondaryText,
    borderWidth: 1,
    borderRadius: 8,
    fontSize: 18,
  },
  inputLabel: {
    fontSize: 20,
    color: colors.primaryText,
    marginBottom: 4,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: colors.primaryContrast,
    fontSize: 22,
    fontWeight: "bold",
  },
  line: {
    backgroundColor: colors.secondaryText,
    height: 1,
    opacity: 0.5,
    marginBottom: 4,
  },
  primaryText: {
    fontSize: 16,
    color: colors.primaryText,
  },
  secondaryText: {
    fontSize: 12,
    color: colors.secondaryText,
  },
  positiveText: {
    fontSize: 16,
    color: colors.positiveText,
  },
  negativeText: {
    fontSize: 16,
    color: colors.negativesText,
  },
  closeButton: {
    marginTop: 16,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "700",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.primaryText,
    marginBottom: 16,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    padding: 20,
  },
  modalContainer: {
    gap: 12,
    borderRadius: 16,
    padding: 20,
    backgroundColor: colors.background,
  },
});
