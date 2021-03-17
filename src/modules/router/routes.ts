import TodayTodoListPage from "@/todayTodolistPage";
import CategorizedTodosPage from "@/categoriesPage";
import { RoutesConfig } from "@src/types";

const routes: RoutesConfig = {
  TodayTodoListPage,
  CategorizedTodosPage,
};

export const initialRoute = "TodayTodoListPage";
export default routes;
