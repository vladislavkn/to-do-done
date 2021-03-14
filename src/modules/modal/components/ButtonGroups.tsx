import Icon from "@/common/components/Icon";
import { ModalButtonGroup, ModalCallback } from "@src/types";
import React from "react";
import {
  ScrollView,
  TouchableNativeFeedback,
  View,
  Text,
  StyleSheet,
} from "react-native";

type ButtonGroupsProps = {
  buttonGroups: ModalButtonGroup[];
  handleButtonPress: (fn: ModalCallback, group: ModalButtonGroup) => void;
};

const ButtonGroups: React.FC<ButtonGroupsProps> = ({
  buttonGroups,
  handleButtonPress,
}) => (
  <>
    {buttonGroups.map((group, groupIndex) => (
      <ScrollView
        contentContainerStyle={styles.group}
        key={groupIndex}
        keyboardShouldPersistTaps="always"
        showsHorizontalScrollIndicator={false}
        horizontal
      >
        {group.buttons.map(
          ({ text, iconProps = null, onPress }, buttonIndex) => (
            <TouchableNativeFeedback
              key={text}
              onPress={() => handleButtonPress(onPress, group)}
            >
              <View
                style={[
                  styles.button,
                  group.selected === text &&
                    group.selectable &&
                    styles.selectedButton,
                  buttonIndex !== group.buttons.length - 1 && {
                    marginRight: 16,
                  },
                ]}
              >
                {iconProps ? <Icon style={styles.icon} {...iconProps} /> : null}
                <Text style={styles.buttonText}>{text}</Text>
              </View>
            </TouchableNativeFeedback>
          )
        )}
        <View style={{ width: 24 }}></View>
      </ScrollView>
    ))}
  </>
);

const styles = StyleSheet.create({
  group: {
    paddingLeft: 16,
    marginBottom: 16,
    justifyContent: "flex-end",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    borderRadius: 16,
    borderColor: "#f0f0f0",
    borderWidth: 1,
  },
  selectedButton: {
    borderColor: "#999",
  },
  buttonText: {
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
    color: "#999",
  },
  icon: {
    marginRight: 8,
  },
});

export default ButtonGroups;
