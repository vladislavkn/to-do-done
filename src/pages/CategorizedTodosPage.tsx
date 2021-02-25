import React, { useState } from "react";
import Categories from "../components/Categories";
import TodoList from "../components/TodoList";
import useStore from "../store";
import { selectedCategorySortedTodosSelector } from "../store/selectors";
import { Category } from "../types";

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
        chosenId={selectedCategoryId}
      />
      <TodoList todos={todos} />
    </>
  );
};

export default CategorizedTodosPage;
