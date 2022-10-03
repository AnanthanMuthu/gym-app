import { STATUS } from "../constants/strings";

export function getStatus(statusId) {
  const foundType = STATUS?.find((el) => el.value === statusId);
  return foundType?.label ?? "";
}

export function formatDate(d) {
  return d.getDate() + "-" + (Number(d.getMonth()) + 1) + "-" + d.getFullYear();
}
export function formatDateTime(d) {
  return (
    d.getDate() +
    "-" +
    (Number(d.getMonth()) + 1) +
    "-" +
    d.getFullYear() +
    " " +
    d.getHours() +
    "-" +
    d.getMinutes() +
    "-" +
    d.getSeconds()
  );
}

export function dateCheck(from, to, check) {
  let fDate, lDate, cDate;
  fDate = Date.parse(from);
  lDate = Date.parse(to);
  cDate = Date.parse(check);

  return cDate >= fDate && cDate <= lDate;
}
