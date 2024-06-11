import { IData } from "../interfaces";

export const fetchDataFromServer = async (): Promise<IData[]> => {
  const response = await fetch("http://localhost:3005/data");
  if (!response.ok) {
    throw new Error("Fetch Error");
  }
  const data: IData[] = await response.json();
  return data;
};
