import { useState } from "react";
import "./NewTask.css";
import { ITask } from "../../../../interfaces";

interface INewTaskProps {
  monthTitle: string;
  tasksList: ITask[] | null;
  isModalNewTask: boolean;
  setIsModalNewTask: React.Dispatch<React.SetStateAction<boolean>>;
}

export const NewTask: React.FC<INewTaskProps> = ({
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
          <button className="modal_box_exit_btn" onClick={changeModal}>
            X
          </button>
        </div>
        <h2 className="modal_box_title">Describe your task.</h2>
        <form
          onSubmit={() => {
            changeModal();
          }}
          className="modal_box_form"
        >
          <textarea
            className="modal_box_form_input"
            rows={5}
            onChange={({ target }) => (newTask = target.value)}
          ></textarea>
          <button className="modal_box_form_btn" type="submit">
            Add task
          </button>
        </form>
      </div>
    </div>
  );
};
