import { RRule } from "rrule";
import { Contact } from "./contact";
export interface Task {
  id: string;
  title: string;
  due: Date;
  done: boolean;
  rrule: RRule;
  contacts: [Contact];
}

export interface DayTask {
  title: string;
  tasks: Array<Task>;
  index: number;
}
