import React from "react";
import { TextInput, StyleSheet } from "react-native";

type OverlayTextInputProps = {
  value: {
    [key: string]: any;
  };
  onChange: (value: OverlayTextInputProps["value"]) => void;
  [key: string]: any;
};

const OverlayTextInput: React.FC<OverlayTextInputProps> = ({
  value,
  onChange,
  ...rest
}) => (
  <TextInput
    style={styles.input}
    value={value.text}
    onChangeText={(text: string) => onChange({ text })}
    autoFocus
    {...rest}
  />
);

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#555",
  },
});

export default OverlayTextInput;
