import * as lodash from "lodash";
import i18n from "../translations";
export function isEnglish(locale: string | undefined): boolean {
  let currentLocale = locale;
  if (lodash.isUndefined(currentLocale)) {
    currentLocale = i18n.locale;
  }
  return !currentLocale || !String(currentLocale).startsWith("zh");
}
