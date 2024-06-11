import { useState } from "react";
import { ITask, IisStikeList } from "../../../interfaces";
import "./Modal.css";
import { isStrikeFun } from "../../../scripts";

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
  const createIsStrikeList = () => {
    const resultArr: IisStikeList[] = [];
    tasksList?.map((el) => resultArr.push({ id: el.id, isStrike: false }));
    return resultArr;
  };
  const [isStrikeList, setIsStrikeList] = useState<IisStikeList[]>(
    createIsStrikeList()
  );

  const changeModal = () => {
    setIsModal(!isModal);
  };

  const isStrikeHandler = (id: number) => {
    setIsStrikeList(
      isStrikeList.map((task) =>
        task.id === id ? { ...task, isStrike: !task.isStrike } : task
      )
    );
  };

  return (
    <div className="modal_new_task_window">
      <div className="modal_box">
        <div className="flex">
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
                <div
                  className="modal_box_tasks_list_item"
                  key={task.id}
                  onClick={() => isStrikeHandler(task.id)}
                >
                  <div>
                    {index + 1}.{" "}
                    {!isStrikeFun(task.id, isStrikeList)?.isStrike ? (
                      <span>{task.text}</span>
                    ) : (
                      <s>{task.text}</s>
                    )}
                  </div>
                  <button className="modal_box_tasks_list_item_btn">X</button>
                </div>
              );
            })
          ) : (
            <div className="modal_box_tasks_list_no_task">No tasks +</div>
          )}
        </div>
      </div>
    </div>
  );
};
