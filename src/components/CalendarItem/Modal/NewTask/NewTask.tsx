import "./NewTask.css";
import { useContext } from "react";
import { MonthDataContext } from "../../../../context";
import { IisStikeList } from "../../../../interfaces";

interface INewTaskProps {
  date: number;
  monthTitle: string;
  isModalNewTask: boolean;
  setIsModalNewTask: (value: boolean) => void;
  isStrikeList: IisStikeList[];
  setIsStrikeList: React.Dispatch<React.SetStateAction<IisStikeList[]>>;
}

export const NewTask: React.FC<INewTaskProps> = ({
  date,
  monthTitle,
  isModalNewTask,
  setIsModalNewTask,
  isStrikeList,
  setIsStrikeList,
}) => {
  const context = useContext(MonthDataContext);

  if (!context) {
    throw new Error("Error while loading context.");
  }

  const { monthsData, setMonthsData } = context;

  if (monthsData === null) {
    return null;
  }

  let newTask = "";

  const changeModal = () => {
    setIsModalNewTask(!isModalNewTask);
  };

  const createTask = (title: string, day: number, text: string) => {
    const newId =
      Math.max(
        ...monthsData.flatMap((month) => month.tasks.map((task) => task.id)),
        0
      ) + 1;

    setMonthsData((prevMonthsData) => {
      if (!prevMonthsData) return null;

      return prevMonthsData.map((month) => {
        if (month.title === title) {
          const newTask = {
            id: newId,
            date: day,
            text: text,
          };

          return {
            ...month,
            tasks: [...month.tasks, newTask],
          };
        }
        return month;
      });
    });
    setIsStrikeList((prevIsStrikeList) => [
      ...prevIsStrikeList,
      {
        id: newId,
        isStrike: false,
      },
    ]);
  };

  if (!isModalNewTask) {
    return null;
  }

  return (
    <div className="modal_new_window">
      <div className="modal_new_box">
        <div className="flex_exit_btn">
          <button className="modal_new_box_exit_btn" onClick={changeModal}>
            X
          </button>
        </div>
        <h2 className="modal_box_title">Describe your task.</h2>
        <form
          onSubmit={() => {
            createTask(monthTitle, date, newTask);
            changeModal();
          }}
          className="modal_box_form"
        >
          <textarea
            className="modal_box_form_input"
            rows={5}
            onChange={({ target }) => (newTask = target.value)}
          ></textarea>
          <div className="modal_box_form_flex">
            <button className="modal_box_form_btn" type="submit">
              Add task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
