import React, { useRef } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";
import { ModalInputProps } from "../../../types";

const ModalTimeInput: React.FC<ModalInputProps> = (props) => {
  const { value, onChange, ...rest } = props;

  const minutesRef = useRef<TextInput>(null);

  const validateTimeInput = (time: string, max: number): string => {
    if (!/^\d$/.test(time)) time = time.replace(/\D/g, "");
    const parsedTime = parseInt(time);
    if (time.length === 2) {
      if (time[0] === "0") time = time[1];
      if (parsedTime > max) time = `${max}`;
      if (parsedTime < 0) time = "0";
    }
    return time;
  };

  const handleHoursChange = (hours: string) => {
    hours = validateTimeInput(hours, 23);
    if (hours.length == 2) minutesRef.current && minutesRef.current.focus();
    onChange({ hours });
  };

  const handleMinutesChange = (minutes: string) => {
    minutes = validateTimeInput(minutes, 59);
    onChange({ minutes });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.label}>HOURS</Text>
        <TextInput
          {...rest}
          maxLength={2}
          keyboardType="decimal-pad"
          placeholder="..."
          style={styles.input}
          value={value.hours}
          onChangeText={handleHoursChange}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}>MINUTES</Text>
        <TextInput
          {...rest}
          ref={minutesRef}
          keyboardType="decimal-pad"
          placeholder="..."
          maxLength={2}
          style={styles.input}
          value={value.minutes}
          onChangeText={handleMinutesChange}
          autoFocus={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  wrapper: {
    flexGrow: 1,
  },
  label: {
    marginBottom: 8,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#999",
  },
  input: {
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#555",
    paddingRight: 8,
  },
  divider: {
    marginHorizontal: 8,
    fontSize: 18,
    fontFamily: "Montserrat_500Medium",
    color: "#555",
  },
});

export default ModalTimeInput;
