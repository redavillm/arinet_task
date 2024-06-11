import { ITask } from "../interfaces";
import { findMonthIdByTitle, generateUniqueId } from "./scripts";

export const createNewTask = async (
  monthTitle: string,
  date: number,
  text: string,
  tasksList: ITask[]
) => {
  const response = await fetch(
    `http://localhost:3005/data/${findMonthIdByTitle(monthTitle)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json;charset=utf-8" },
      body: JSON.stringify({
        tasks: { id: generateUniqueId(tasksList), date: date, text: text },
      }),
    }
  );
  if (!response.ok) {
    throw new Error("Fetch Error");
  }
};
