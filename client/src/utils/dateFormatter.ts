import dateFormat from "dateformat";

export function formatDate(date: string) {
  return dateFormat(date, "dd-mm-yyyy hh:MM");
}
