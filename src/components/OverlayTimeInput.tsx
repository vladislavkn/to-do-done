import React, { useRef } from "react";
import { TextInput, StyleSheet, View, Text } from "react-native";

type OverlayTimeInputProps = {
  value: {
    [key: string]: any;
  };
  onChange: (
    value: React.SetStateAction<OverlayTimeInputProps["value"]>
  ) => void;
  [key: string]: any;
};

const OverlayTimeInput: React.FC<OverlayTimeInputProps> = ({
  value,
  onChange,
  ...rest
}) => {
  const minutesRef = useRef<TextInput>(null);
  const validateTimeInput = (time: string, max: number): string => {
    if (!/^\d$/.test(time)) time = time.replace(/\D/g, "");
    if (time.length === 2) {
      if (time[0] === "0") time = time[1];
      else if (parseInt(time) > max) time = `${max}`;
      else if (parseInt(time) < 0) time = "0";
    }
    return time;
  };

  return (
    <View style={styles.container}>
      <View style={[styles.wrapper, { marginRight: 16 }]}>
        <Text style={styles.label}>HOURS</Text>
        <TextInput
          maxLength={2}
          keyboardType="decimal-pad"
          placeholder="..."
          style={styles.input}
          value={value.hours}
          autoFocus
          onChangeText={(hours: string) => {
            hours = validateTimeInput(hours, 23);
            if (hours.length == 2)
              minutesRef.current && minutesRef.current.focus();
            onChange((prevState) => ({ ...prevState, hours }));
          }}
          {...rest}
        />
      </View>
      <View style={styles.wrapper}>
        <Text style={styles.label}>MINUTES</Text>
        <TextInput
          ref={minutesRef}
          keyboardType="decimal-pad"
          placeholder="..."
          maxLength={2}
          style={styles.input}
          value={value.minutes}
          onChangeText={(minutes: string) => {
            minutes = validateTimeInput(minutes, 59);
            onChange((prevState) => ({ ...prevState, minutes }));
          }}
          {...rest}
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

export default OverlayTimeInput;
