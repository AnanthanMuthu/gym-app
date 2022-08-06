import { STATUS } from "../constants/strings";

export function getStatus(statusId) {
  const foundType = STATUS?.find((el) => el.value === statusId);
  console.log("### getStatus", STATUS, foundType, typeof statusId, statusId);
  return foundType?.label ?? "";
}
