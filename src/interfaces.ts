export interface ITask {
  id: number;
  date: number;
  text: string;
}

export interface IData {
  id: number;
  title: string;
  days: number;
  tasks: Array<ITask>;
}

export interface IisStikeList {
  id: number;
  isStrike: boolean;
}
