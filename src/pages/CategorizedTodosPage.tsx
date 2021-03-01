import React, { useState } from "react";
import { ScrollView } from "react-native";
import Categories from "../components/Categories";
import TodoList from "../components/TodoList";
import { showEditCategoryOverlay } from "../overlays";
import useStore from "../store";
import { selectedCategorySortedTodosSelector } from "../store/selectors";

const CategorizedTodosPage = () => {
  const [selectedCategoryId, setSelectedCategoryId] = useStore((state) => [
    state.selectedCategoryId,
    state.setSelectedCategoryId,
  ]);
  const categories = useStore((state) => state.categories);
  const todos = useStore(selectedCategorySortedTodosSelector);

  return (
    <>
      <Categories
        categories={categories}
        onPress={setSelectedCategoryId}
        onLongPress={showEditCategoryOverlay}
        chosenId={selectedCategoryId}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        <TodoList todos={todos} />
      </ScrollView>
    </>
  );
};

export default CategorizedTodosPage;
