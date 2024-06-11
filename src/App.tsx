import { useEffect, useState } from "react";
import "./App.css";
import { Calendar } from "./components/Calendar/Calendar";
import { IData } from "./interfaces";
import { fetchDataFromServer } from "./scripts";

function App() {
  const [monthsData, setMonthsData] = useState<IData[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean | null>(false);

  useEffect(() => {
    setLoading(true);
    fetchDataFromServer()
      .then((data) => {
        setMonthsData(data);
      })
      .finally(() => setLoading(false))
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!monthsData) {
    return (
      <h1 className="app_title">
        Oops...looks like data doesn`t loaded, please try again late.
      </h1>
    );
  }

  return (
    <div className="app">
      <h1 className="app_title">Your To Do List.</h1>
      {monthsData.map((el) => (
        <Calendar month={el} key={el.id} />
      ))}
    </div>
  );
}

export default App;
