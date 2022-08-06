const gymImage = require("./../assets/icon_gym.png");
const categoryImage = require("./../assets/icon_category.png");
const playImage = require("./../assets/icon_play.png");
const sessionImage = require("./../assets/icon_session.png");
const scheduleImage = require("./../assets/icon_schedule.png");
const displayImage = require("./../assets/icon_display.png");
export const CATEGORIES = [
  { id: 1, title: "Gym", image: gymImage, route: "Gym List" },
  { id: 2, title: "Category", image: categoryImage, route: "Category" },
  { id: 3, title: "Play", image: playImage, route: "Plays" },
  { id: 4, title: "Session", image: sessionImage, route: "Session" },
  { id: 5, title: "Schedule", image: scheduleImage, route: "Schedule" },
  { id: 6, title: "Display", image: displayImage, route: "Display" },
];

export const STATUS = [
  { label: "Active", value: 1, key: 1 },
  { label: "InActive", value: 0, key: 0 },
];

export const FILE_TYPES = [
  { label: "Image", value: 3, key: 3 },
  { label: "Video", value: 1, key: 1 },
];

export const TYPES = [
  { label: "Main Display", value: 3, key: 3 },
  { label: "Display", value: 4, key: 4 },
];

export const checkboxData = [
  { id: 1, txt: "Monday", isChecked: false },
  { id: 2, txt: "Tuesday", isChecked: false },
  { id: 3, txt: "Wednesday", isChecked: false },
  { id: 4, txt: "Thursday", isChecked: false },
  { id: 5, txt: "Friday", isChecked: false },
  { id: 6, txt: "Saturday", isChecked: false },
  { id: 7, txt: "Sunday", isChecked: false },
];
