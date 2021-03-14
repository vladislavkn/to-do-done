import React from "react";
import { ScrollView } from "react-native";
import Categories from "./components/Categories";
import useStore from "@/app/store";
import { showEditCategoryModal } from "@/modal/modals";
import TodoList from "@/todolist/components/TodoList";
import { selectedCategorySortedTodosSelector } from "@/app/selectors";

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
        onLongPress={showEditCategoryModal}
        chosenId={selectedCategoryId}
      />
      <ScrollView style={{ flexGrow: 1 }}>
        <TodoList todos={todos} />
      </ScrollView>
    </>
  );
};

export default CategorizedTodosPage;
