import { useState } from "react";
import "./NewTask.css";
import { ITask } from "../../../../interfaces";
import { createNewTask } from "../../../../scripts/createNewTask";

interface INewTaskProps {
  date: number;
  monthTitle: string;
  tasksList: ITask[] | null;
  isModalNewTask: boolean;
  setIsModalNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewTask: React.FC<INewTaskProps> = ({
  date,
  monthTitle,
  tasksList,
  isModalNewTask,
  setIsModalNewTask,
}) => {
  let newTask = "";

  const changeModal = () => {
    setIsModalNewTask(!isModalNewTask);
  };

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
            createNewTask(monthTitle, date, newTask, tasksList);
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
