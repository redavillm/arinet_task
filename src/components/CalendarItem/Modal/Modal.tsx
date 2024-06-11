import { useState } from "react";
import { ITask, IisStikeList } from "../../../interfaces";
import "./Modal.css";
import { createIsStrikeList, isStrikeFun } from "../../../scripts";
import { NewTask } from "./NewTask/NewTask";

interface ModalProps {
  date: number;
  title: string;
  tasksList: ITask[] | null;
  isModal: boolean;
  setIsModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Modal: React.FC<ModalProps> = ({
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
                    // onClick={() => deleteTask(task.id)}
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
          tasksList={tasksList}
          isModalNewTask={isModalNewTask}
          setIsModalNewTask={setIsModalNewTask}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
