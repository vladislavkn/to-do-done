import React from "react";
import { TextInput, StyleSheet } from "react-native";
import { ModalInputProps } from "@src/types";

const ModalTextInput: React.FC<ModalInputProps> = (props) => {
  const { value, onChange, ...rest } = props;

  return (
    <TextInput
      style={styles.input}
      value={value.text}
      onChangeText={(text: string) => onChange({ text })}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#555",
  },
});

export default ModalTextInput;
