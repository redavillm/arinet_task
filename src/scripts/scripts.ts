import { IisStikeList } from "../interfaces";

export const stringFormat = (str: string) => {
  return str.length > 17 ? str.slice(0, 15) + "..." : str;
};

export const isStrikeFun = (taskId: number, arr: IisStikeList[]) => {
  return arr.find((el) => el.id === taskId);
};
