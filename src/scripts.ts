import { ITask, IisStikeList } from "./interfaces";

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
