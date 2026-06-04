import { StyleSheet, Text } from "react-native";
import { TouchableHighlight } from "react-native";
import { colors } from "../constants/colors";

export default function Button({ children, onPress, color, style: customStyle }) {
  return (
    <TouchableHighlight
      style={[style.background, customStyle, { backgroundColor: color ?? colors.primary }]}
      onPress={onPress}
    >
      <Text style={style.text}>{children}</Text>
    </TouchableHighlight>
  );
}

export const style = StyleSheet.create({
  background: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 44,
    borderRadius: 8,
    paddingHorizontal: 16,
    minWidth: 120,
  },
  text: {
    color: colors.primaryContrast,
    fontSize: 18,
    fontWeight: "600",
  },
});
