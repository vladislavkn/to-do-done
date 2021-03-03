import React from "react";
import {
  View,
  ScrollView,
  TouchableNativeFeedback,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { useModalStore } from "../store/modal";
import { topModalSelector } from "../store/selectors";
import {
  ModalButtonGroup,
  ModalInputType,
  ModalValue,
  ModalCallback,
} from "../types";
import Icon from "./Icon";
import ModalTextInput from "./ModalTextInput";
import ModalTimeInput from "./ModalTimeInput";

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

  const handleCallback = (fn?: ModalCallback) => fn && fn(modal, update);

  const handleButtonPress = (
    group: ModalButtonGroup,
    index: number,
    text: string
  ) => {
    const fn = group.buttons.find((b) => b.text === text)?.onPress;
    handleCallback(fn);
    group.selectable && (group.selected = text);
    modal.buttonGroups[index] = group;
    update(modal);
  };

  const handleValueChange = (value: ModalValue) => {
    modal.value = { ...modal.value, ...value };
    update(modal);
  };

  const handleClose = () => {
    handleCallback(modal.submit);
    pop();
  };

  return (
    <TouchableWithoutFeedback onPress={handleClose}>
      <View style={styles.backdrop}>
        <View style={styles.container}>
          <ModalInput
            value={modal.value}
            onChange={handleValueChange}
            onSubmitEditing={() => handleCallback(modal.submit)}
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
              {group.buttons.map(({ text, iconProps = null }, buttonIndex) => (
                <TouchableNativeFeedback
                  key={text}
                  onPress={() => handleButtonPress(group, groupIndex, text)}
                >
                  <View
                    style={[
                      styles.button,
                      group.selected === text && styles.selectedButton,
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
              ))}
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
