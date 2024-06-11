import { ITask, IisStikeList } from "../interfaces";

const MONTHS_NUMBER = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const stringFormat = (str: string) => {
  return str.length > 17 ? str.slice(0, 15) + "..." : str;
};

export const isStrikeFun = (taskId: number, arr: IisStikeList[]) => {
  return arr.find((el) => el.id === taskId);
};

export const createIsStrikeList = (arr: ITask[]) => {
  const resultArr: IisStikeList[] = [];
  arr?.map((el) => resultArr.push({ id: el.id, isStrike: false }));
  return resultArr;
};

export const findMonthIdByTitle = (title: string): number => {
  return MONTHS_NUMBER.indexOf(title) + 1;
};

export const generateUniqueId = (tasks: ITask[]) => {
  const ids = tasks.map((task) => task.id);
  const maxId = ids.length > 0 ? Math.max(...ids) : 0;
  return maxId + 1;
};
