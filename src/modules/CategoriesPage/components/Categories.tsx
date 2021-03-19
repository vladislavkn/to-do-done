import React from "react";
import {
  ScrollView,
  View,
  Text,
  TouchableNativeFeedback,
  StyleSheet,
} from "react-native";
import { Category, State } from "@src/types";
import Icon from "@/common/components/Icon";
import { showAddCategoryModal } from "@/modal/modals";

type CategoriesProps = {
  categories: Category[];
  onPress: (category: Category) => void;
  onLongPress: (category: Category) => void;
  chosenId: State["selectedCategoryId"];
};

const Categories: React.FC<CategoriesProps> = ({
  categories,
  onPress,
  chosenId,
  onLongPress,
}) => {
  return (
    <ScrollView
      style={styles.container}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableNativeFeedback onPress={showAddCategoryModal}>
        <View style={styles.categoryWrapper}>
          <View style={[styles.category, styles.button]}>
            <Icon style={styles.icon} name="add" width={12} height={12} />
            <Text style={styles.categoryText}>Add</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
      {categories.map((category) => (
        <TouchableNativeFeedback
          key={category.id}
          onPress={() => onPress(category)}
          onLongPress={() => onLongPress(category)}
        >
          <View style={styles.categoryWrapper}>
            <View
              style={[
                styles.category,
                chosenId === category.id && styles.selectedCategory,
              ]}
            >
              <Text style={styles.categoryText}>{category.name}</Text>
            </View>
          </View>
        </TouchableNativeFeedback>
      ))}
      <View style={{ width: 32 }}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    backgroundColor: "#FBFBFB",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    flexGrow: 0,
    flexShrink: 0,
  },
  categoryWrapper: {
    padding: 8,
  },
  category: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#F0F0F0",
    borderWidth: 1,
    borderColor: "#F0F0F0",
    borderRadius: 16,
  },
  selectedCategory: {
    borderColor: "#999",
  },
  categoryText: {
    color: "#999999",
    fontSize: 14,
    fontFamily: "Montserrat_600SemiBold",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    fontFamily: "Montserrat_700Bold",
  },
  icon: {
    marginRight: 8,
  },
});

export default Categories;
