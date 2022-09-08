import {
  SET_USER,
  SET_GYM_LIST,
  UPDATE_GYM,
  SET_CATEGORY_LIST,
  UPDATE_CATEGORY,
  SET_DISPLAY_LIST,
  SET_CITY,
  SET_PLAY_LIST,
  UPDATE_PLAY,
  SET_DISPLAY_ADDED,
  ADD_GYM,
  ADD_CATEGORY,
  SET_TIMEZONE,
  SET_MODIFIED_GYM_LIST,
  PLAY_ADDED,
  UPDATE_MOD_CATEGORY,
  DELETE_GYM,
  SET_DISPLAY_DELETED,
  SET_SESSION_LIST,
  UPDATE_MOD_PLAYLIST,
  SET_CAT_PLAY_LIST,
  SET_SESSION_ADDED,
  SET_SESSION_PLAY_LIST,
  SET_SESSION_UPDATED,
  SET_SESSION_MOD_LIST,
  SET_DISPLAY_MOD_LIST,
  SET_SCHEDULE_LIST,
  SET_SCHEDULE_ADDED,
  SET_SCHEDULE_DISPLAY_LIST,
  SET_SCHEDULE_DISPLAY,
} from "../actions/gym";

const initialState = {
  user: {},
  gymList: [],
  categoryList: [],
  displayList: [],
  displayModList: [],
  cityList: [],
  timezoneList: [],
  playList: [],
  modGymList: [],
  modCategoryList: [],
  modPlayList: [],
  catPlayList: [],
  sessionList: [],
  sessionModList: [],
  sessionPlayList: [],
  scheduleDisplayList: [],
  scheduleDisplay: [],
  scheduleList: [],
  isGymUpdated: false,
  isCategoryUpdated: false,
  isPlayUpdated: false,
  isDisplayAdded: false,
  isGymAdded: false,
  isCategoryAdded: false,
  isPlayAdded: false,
  isGymDeleted: false,
  isDisplayDeleted: false,
  isSessionAdded: false,
  isSessionUpdated: false,
  isScheduleAdded: false,
};

export const gymReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };

    case SET_GYM_LIST:
      return {
        ...state,
        gymList: payload,
      };

    case SET_CATEGORY_LIST:
      return {
        ...state,
        categoryList: payload,
      };

    case SET_DISPLAY_LIST:
      return {
        ...state,
        displayList: payload,
      };

    case UPDATE_GYM:
      return {
        ...state,
        isGymUpdated: payload,
      };

    case UPDATE_CATEGORY:
      return {
        ...state,
        isCategoryUpdated: payload,
      };

    case UPDATE_PLAY:
      return {
        ...state,
        isPlayUpdated: payload,
      };

    case SET_CITY:
      return {
        ...state,
        cityList: payload,
      };

    case SET_PLAY_LIST:
      return {
        ...state,
        playList: payload,
      };

    case SET_DISPLAY_ADDED:
      return {
        ...state,
        isDisplayAdded: payload,
      };

    case ADD_GYM:
      return {
        ...state,
        isGymAdded: payload,
      };

    case ADD_CATEGORY:
      return {
        ...state,
        isCategoryAdded: payload,
      };

    case SET_TIMEZONE:
      return {
        ...state,
        timezoneList: payload,
      };

    case SET_MODIFIED_GYM_LIST:
      return {
        ...state,
        modGymList: payload,
      };

    case PLAY_ADDED:
      return {
        ...state,
        isPlayAdded: payload,
      };

    case UPDATE_MOD_CATEGORY:
      return {
        ...state,
        modCategoryList: payload,
      };

    case DELETE_GYM:
      return {
        ...state,
        isGymDeleted: payload,
      };

    case SET_DISPLAY_DELETED:
      return {
        ...state,
        isDisplayDeleted: payload,
      };

    case SET_SESSION_LIST:
      return {
        ...state,
        sessionList: payload,
      };

    case SET_SESSION_PLAY_LIST:
      return {
        ...state,
        sessionPlayList: payload,
      };

    case UPDATE_MOD_PLAYLIST:
      return {
        ...state,
        modPlayList: payload,
      };

    case SET_CAT_PLAY_LIST:
      return {
        ...state,
        catPlayList: payload,
      };

    case SET_SESSION_ADDED:
      return {
        ...state,
        isSessionAdded: payload,
      };

    case SET_SESSION_UPDATED:
      return {
        ...state,
        isSessionUpdated: payload,
      };

    case SET_SESSION_MOD_LIST:
      return {
        ...state,
        sessionModList: payload,
      };

    case SET_DISPLAY_MOD_LIST:
      return {
        ...state,
        displayModList: payload,
      };

    case SET_SCHEDULE_LIST:
      return {
        ...state,
        scheduleList: payload,
      };

    case SET_SCHEDULE_ADDED:
      return {
        ...state,
        isScheduleAdded: payload,
      };

    case SET_SCHEDULE_DISPLAY_LIST:
      return {
        ...state,
        scheduleDisplayList: payload,
      };
    case SET_SCHEDULE_DISPLAY:
      return {
        ...state,
        scheduleDisplay: payload,
      };

    default:
      return state;
  }
};
