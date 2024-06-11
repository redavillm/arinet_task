import { IData, ITask } from "../../interfaces";
import { CalendarItem } from "../CalendarItem/CalendarItem";

interface MonthProps {
  month: IData;
}

export const Calendar: React.FC<MonthProps> = ({ month }) => {
  const { title, days, tasks } = month;
  let result: Array<ITask[] | null> = [];

  for (let i = 1; i < days; i++) {
    let tasksArr = tasks.filter((el) => el.date === i);
    if (tasksArr.length !== 0) {
      result.push(tasksArr);
    } else {
      result.push(null);
    }
  }

  return (
    <div>
      <h2>{title}</h2>
      <div className="data_list">
        {result.map((el, index) => (
          <CalendarItem
            key={index}
            title={title}
            date={index + 1}
            tasksList={el}
          />
        ))}
      </div>
    </div>
  );
};
