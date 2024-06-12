import { createContext } from "react";
import { IData } from "./interfaces";

interface IMonthDataContext {
  monthsData: IData[] | null;
  setMonthsData: React.Dispatch<React.SetStateAction<IData[] | null>>;
}

export const MonthDataContext = createContext<IMonthDataContext | null>(null);
