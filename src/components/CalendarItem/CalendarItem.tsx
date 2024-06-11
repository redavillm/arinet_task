import { useState } from "react";
import { ITask } from "../../interfaces";
import { stringFormat } from "../../scripts";
import "./CalendarItem.css";
import { Modal } from "./Modal/Modal";

interface CalendarItemProps {
  title: string;
  date: number;
  tasksList: ITask[] | null;
}

export const CalendarItem: React.FC<CalendarItemProps> = ({
  title,
  date,
  tasksList,
}) => {
  const [isModal, setIsModal] = useState(false);

  const changeModal = () => {
    setIsModal(!isModal);
  };

  return (
    <div className="data_list">
      <div className="data_list_item" onClick={changeModal}>
        <div className="data_list_item_number">{date}</div>
        <ul className="data_list_item_tasks">
          {tasksList ? (
            tasksList.map((task, index) => {
              if (index <= 5) {
                return <li key={task.id}>{stringFormat(task.text)}</li>;
              } else {
                return undefined;
              }
            })
          ) : (
            <div className="data_list_item_no_task">No tasks +</div>
          )}
        </ul>
        <div className="data_list_item_tasks_counter">
          {!tasksList ? "0" : tasksList.length} tasks
        </div>
      </div>
      {isModal ? (
        <Modal
          isModal={isModal}
          setIsModal={setIsModal}
          title={title}
          date={date}
          tasksList={tasksList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
