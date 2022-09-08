import { STATUS } from "../constants/strings";

export function getStatus(statusId) {
  const foundType = STATUS?.find((el) => el.value === statusId);
  return foundType?.label ?? "";
}
