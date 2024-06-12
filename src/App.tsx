import { useState } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { IData } from "./interfaces";
import { DATA_FROM_SERVER } from "./db";
import { MonthDataContext } from "./context";

function App() {
  const [monthsData, setMonthsData] = useState<IData[] | null>(
    DATA_FROM_SERVER
  );

  if (!monthsData) {
    return (
      <h1 className="app_title">
        Oops...looks like data doesn`t loaded, please try again late.
      </h1>
    );
  }

  return (
    <MonthDataContext.Provider value={{ monthsData, setMonthsData }}>
      <div className="app">
        <h1 className="app_title">Your To Do List.</h1>
        {monthsData.map((el) => (
          <Calendar key={el.id} month={el} />
        ))}
      </div>
    </MonthDataContext.Provider>
  );
}

export default App;
