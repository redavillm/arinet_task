import "./Modal.css";
import { useContext, useState } from "react";
import { ITask, IisStikeList } from "../../../interfaces";
import { createIsStrikeList, isStrikeFun } from "../../../scripts";
import { NewTask } from "./NewTask/NewTask";
import { MonthDataContext } from "../../../context";

interface IModalProps {
  date: number;
  title: string;
  tasksList: ITask[] | null;
  isModal: boolean;
  // setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
  setIsModal: (value: boolean) => void;
}

export const Modal: React.FC<IModalProps> = ({
  isModal,
  setIsModal,
  title,
  date,
  tasksList,
}) => {
  const [isModalNewTask, setIsModalNewTask] = useState(false);
  const [isStrikeList, setIsStrikeList] = useState<IisStikeList[]>(
    tasksList ? createIsStrikeList(tasksList) : []
  );
  const context = useContext(MonthDataContext);

  if (!context) {
    throw new Error("Error while loading context.");
  }

  const { monthsData, setMonthsData } = context;

  if (monthsData === null) {
    return null;
  }

  const changeModal = () => {
    setIsModal(!isModal);
  };

  const changeNewModal = () => {
    setIsModalNewTask(!isModalNewTask);
  };

  const isStrikeHandler = (id: number) => {
    setIsStrikeList(
      isStrikeList.map((task) =>
        task.id === id ? { ...task, isStrike: !task.isStrike } : task
      )
    );
  };

  const deleteTask = (id: number, title: string) => {
    setMonthsData((prevMonthsData) => {
      if (!prevMonthsData) return null;

      return prevMonthsData.map((month) => {
        if (month.title === title) {
          return {
            ...month,
            tasks: month.tasks.filter((task) => task.id !== id),
          };
        }
        return month;
      });
    });
    setIsStrikeList((prevIsStrikeList) =>
      prevIsStrikeList.filter((task) => task.id !== id)
    );
  };

  if (!isModal) {
    return null;
  }

  return (
    <div className="modal_window">
      <div className="modal_box">
        <div className="flex_exit_btn">
          <button className="modal_box_exit_btn" onClick={changeModal}>
            X
          </button>
        </div>
        <h2 className="modal_box_title">
          List of tasks for {title} {date}
        </h2>
        <div className="modal_box_tasks_list">
          {tasksList ? (
            tasksList.map((task, index) => {
              return (
                <div className="modal_box_tasks_list_item" key={task.id}>
                  <div onClick={() => isStrikeHandler(task.id)}>
                    {index + 1}.{" "}
                    {!isStrikeFun(task.id, isStrikeList)?.isStrike ? (
                      <span>{task.text}</span>
                    ) : (
                      <s>{task.text}</s>
                    )}
                  </div>
                  <button
                    className="modal_box_tasks_list_item_delet_btn"
                    onClick={() => deleteTask(task.id, title)}
                  >
                    X
                  </button>
                </div>
              );
            })
          ) : (
            <div className="modal_box_tasks_list_no_task">No tasks.</div>
          )}
        </div>
        <div className="flex_new_task_btn">
          <button className="modal_box_new_task_btn" onClick={changeNewModal}>
            Add new task
          </button>
        </div>
      </div>
      {isModalNewTask ? (
        <NewTask
          date={date}
          monthTitle={title}
          isModalNewTask={isModalNewTask}
          setIsModalNewTask={setIsModalNewTask}
          isStrikeList={isStrikeList}
          setIsStrikeList={setIsStrikeList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
