import i18n from "../translations";

export const TimeUtil = {
  getTimeAgo: (startTime: string) => {
    let result = "";
    const minute = 1000 * 60;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const now = new Date().getTime();
    const startTimeStamp = new Date(startTime).getTime();
    const diffValue = now - startTimeStamp;
    if (diffValue < 0) {
      return result;
    }
    const monthC = diffValue / month;
    const weekC = diffValue / week;
    const dayC = diffValue / day;
    const hourC = diffValue / hour;
    const minC = diffValue / minute;
    if (monthC >= 1) {
      result = `${Math.floor(monthC)} ${
        Math.floor(monthC) > 1 ? i18n.t("monthsAgo") : i18n.t("monthAgo")
      }`;
    } else if (weekC >= 1) {
      result = `${Math.floor(weekC)} ${
        Math.floor(weekC) > 1 ? i18n.t("weeksAgo") : i18n.t("weekAgo")
      }`;
    } else if (dayC >= 1) {
      result = `${Math.floor(dayC)} ${
        Math.floor(dayC) > 1 ? i18n.t("daysAgo") : i18n.t("dayAgo")
      }`;
    } else if (hourC >= 1) {
      result = `${Math.floor(hourC)} ${
        Math.floor(hourC) > 1 ? i18n.t("hoursAgo") : i18n.t("hourAgo")
      }`;
    } else if (minC >= 1) {
      result = `${Math.floor(minC)} ${
        Math.floor(minC) > 1 ? i18n.t("minutesAgo") : i18n.t("minuteAgo")
      }`;
    } else {
      result = `${i18n.t("justRecently")}`;
    }
    return result;
  }
};
