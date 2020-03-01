import moment from "moment";
import "moment/locale/en-gb";
import "moment/locale/zh-cn";
import i18n from "../translations";
import { DayTask, Task } from "../types/task";

export function getFormatDateStr(dayTask: DayTask): string {
  moment.locale(i18n.locale === "zh" ? "zh-cn" : "en-gb");
  if (dayTask.date == null) {
    return "null";
  } else {
    return moment(dayTask.date)
      .format("llll")
      .replace("00:00", "");
  }
}

export function getFormatTimeStr(date: Date): string {
  return moment(date).format("LT");
}

export function handleTasks(tasks: Array<Task>): Array<DayTask> {
  const reftoday = new Date(new Date().setHours(0, 0, 0, 0));
  const todayPlus1 = new Date(reftoday.setDate(reftoday.getDate() + 1));
  const todayPlus2 = new Date(reftoday.setDate(reftoday.getDate() + 1));
  const todayPlus3 = new Date(reftoday.setDate(reftoday.getDate() + 1));
  const todayPlus4 = new Date(reftoday.setDate(reftoday.getDate() + 1));
  const todayPlus5 = new Date(reftoday.setDate(reftoday.getDate() + 1));
  const today = new Date(new Date().setHours(0, 0, 0, 0));

  const result = [0, 1, 2, 3, 4, 5, 6].map(value => {
    let title = "";
    let date: Date | null = new Date();
    switch (value) {
      case 0:
        title = i18n.t("past");
        date = null;
        break;
      case 1:
        title = i18n.t("today");
        date = today;
        break;
      case 2:
        title = getWeek(todayPlus1.getDay());
        date = todayPlus1;
        break;
      case 3:
        title = getWeek(todayPlus2.getDay());
        date = todayPlus2;
        break;
      case 4:
        title = getWeek(todayPlus3.getDay());
        date = todayPlus3;
        break;
      case 5:
        title = getWeek(todayPlus4.getDay());
        date = todayPlus4;
        break;
      case 6:
        title = i18n.t("future");
        date = null;
        break;
      default:
        title = "";
    }
    return { title, tasks: Array<Task>(), index: value, date };
  });
  tasks.forEach(task => {
    if (task.due < today) {
      result[0].tasks.push(task);
    } else if (task.due < todayPlus1) {
      result[1].tasks.push(task);
    } else if (task.due < todayPlus2) {
      result[2].tasks.push(task);
    } else if (task.due < todayPlus3) {
      result[3].tasks.push(task);
    } else if (task.due < todayPlus4) {
      result[4].tasks.push(task);
    } else if (task.due < todayPlus5) {
      result[5].tasks.push(task);
    } else if (task.due > todayPlus5) {
      result[6].tasks.push(task);
    }
  });
  return result;
}

function getWeek(day: number): string {
  switch (day) {
    case 0:
      return i18n.t("sun");
    case 1:
      return i18n.t("mon");
    case 2:
      return i18n.t("tue");
    case 3:
      return i18n.t("wed");
    case 4:
      return i18n.t("thu");
    case 5:
      return i18n.t("fri");
    case 6:
      return i18n.t("sat");
    default:
      return "";
  }
}
