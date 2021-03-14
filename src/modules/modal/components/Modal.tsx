import React from "react";
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  GestureResponderEvent,
} from "react-native";
import { useModalStore } from "../store";
import {
  ModalInputType,
  ModalValue,
  ModalCallback,
  ModalButtonGroup,
  ModalSubmit,
} from "@src/types";
import ModalTextInput from "./ModalTextInput";
import ModalTimeInput from "./ModalTimeInput";
import { topModalSelector } from "../selectors";
import Icon from "@/common/components/Icon";

const getInputComponent = (inputType: ModalInputType) => {
  return {
    time: ModalTimeInput,
    text: ModalTextInput,
    none: (() => null) as React.FC,
  }[inputType];
};

const Modal = () => {
  const modal = useModalStore(topModalSelector);
  const [update, pop] = useModalStore((state) => [state.update, state.pop]);
  const ModalInput = getInputComponent(modal.inputType);

  const handleSubmit = (fn?: ModalSubmit) => fn && fn(modal, update);
  const handleButtonPress = (fn: ModalCallback, group: ModalButtonGroup) =>
    fn && fn(modal, update, group);

  const handleValueChange = (value: ModalValue) => {
    modal.value = { ...modal.value, ...value };
    update(modal);
  };

  const handleClose = (e: GestureResponderEvent) => {
    if (e.target === e.currentTarget) {
      handleSubmit(modal.submit);
      pop();
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <ModalInput
            value={modal.value}
            onChange={handleValueChange}
            onSubmitEditing={() => handleSubmit(modal.submit)}
            placeholderTextColor="#999"
            selectionColor="rgba(85,85,85,0.2)"
            autoFocus={modal.autoFocus}
            placeholder={modal.inputType === "text" ? modal.placeholder : null}
          />
          {modal.buttonGroups.map((group, groupIndex) => (
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
                      {iconProps ? (
                        <Icon style={styles.icon} {...iconProps} />
                      ) : null}
                      <Text style={styles.buttonText}>{text}</Text>
                    </View>
                  </TouchableNativeFeedback>
                )
              )}
              <View style={{ width: 24 }}></View>
            </ScrollView>
          ))}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    justifyContent: "flex-end",
    position: "absolute",
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.2)",
  },
  container: {
    backgroundColor: "#fff",
    paddingTop: 24,
    borderTopRightRadius: 24,
    borderTopLeftRadius: 24,
    marginTop: 8,
    shadowRadius: 4,
    shadowOpacity: 1.0,
    shadowOffset: {
      width: 0,
      height: -8,
    },
    shadowColor: "#000",
    elevation: 7,
  },
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

export default Modal;
