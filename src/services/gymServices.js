import { api } from "./index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import {
  setGymList,
  setModifiedGymList,
  setUser,
  setGymUpdate,
  setGymAdded,
  setCategoryList,
  setSessionList,
  setModSessionList,
  setCategoryUpdate,
  setModCategoryUpdate,
  setDisplayList,
  setModDisplayList,
  setCity,
  setTimezone,
  setPlayList,
  setDisplayAdded,
  setDisplayDeleted,
  setCategoryAdded,
  setPlayUpdate,
  setPlayAdded,
  setGymDeleted,
  setModPlayList,
  setCatBasedPlayList,
  setSessionAdded,
  setSessionPlayList,
  setSessionUpdated,
  setScheduleList,
  setScheduleAdded,
} from "../redux/actions/gym";

export default () => {
  const {
    user,
    gymList,
    categoryList,
    isGymUpdated,
    isCategoryUpdated,
    displayList,
    cityList,
    playList,
    isPlayUpdated,
    isDisplayAdded,
    isGymAdded,
    isCategoryAdded,
    timezoneList,
    modGymList,
    isPlayAdded,
    modCategoryList,
    isGymDeleted,
    isDisplayDeleted,
    sessionList,
    modPlayList,
    catPlayList,
    isSessionAdded,
    sessionPlayList,
    isSessionUpdated,
    sessionModList,
    displayModList,
    scheduleList,
    isScheduleAdded,
  } = useSelector((state) => state.gym);

  const dispatch = useDispatch();

  const loginAPI = async (data) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);

    const response = await api.post("login.php", formData);
    console.log("### loginAPI", formData, response);
    if (response) {
      const userInfo = {
        name: response.name,
        type: response.type,
        gym: response.gym,
        userid: response.userid,
        userkey: response.userkey,
      };
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      const result = !response.error ? userInfo : {};
      dispatch(setUser(result));
    }
  };

  const getGymList = async () => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("gymid", "ALL");

    const response = await api.post("gym_details.php", formData);

    const result = !response.error ? response.gymdata : [];
    console.log("### getGymList result", formData, response);
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    dispatch(setGymDeleted(false));
    dispatch(setGymUpdate(false));
    dispatch(setModifiedGymList(res));
    dispatch(setGymList(result));
  };

  const getCategoryList = async () => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("id", "ALL");

    const response = await api.post("category_details.php", formData);

    const result = !response.error ? response.gymdata : [];
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    console.log("### getCategoryList", result, res);
    dispatch(setModCategoryUpdate(res));
    dispatch(setCategoryList(result));
  };

  const getSessionList = async () => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("id", "ALL");

    const response = await api.post("session_list.php", formData);
    const result = !response.error ? response.gymdata : [];
    console.log("### getSessionList", formData, result);
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    dispatch(setSessionAdded(false));
    dispatch(setSessionUpdated(false));
    dispatch(setModSessionList(res));
    dispatch(setSessionList(result));
  };

  const getSessionPlayList = async (id) => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("id", id);

    const response = await api.post("session_play_list.php", formData);
    const result = !response.error ? response.playlist : [];
    result.sort((a, b) => (a.orderid > b.orderid ? 1 : -1));
    console.log("### getSessionPlayList", formData, result);
    dispatch(setSessionPlayList(result));
  };

  const addSession = async (data) => {
    const formData = { ...data, userid: user.userid };

    const response = await api.post("session_add.php", formData);
    const result = !response.error ? true : false;
    console.log("### addSession", formData, result, response);

    dispatch(setSessionAdded(result));
    getSessionList();
  };

  const updateSession = async (data) => {
    const formData = { ...data, userid: user.userid };

    const response = await api.post("session_update.php", formData);
    const result = !response.error ? true : false;
    console.log("### updateSession", formData, result, response);

    dispatch(setSessionUpdated(result));
    getSessionList();
  };

  const cloneSession = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("session_clone.php", formData);
    const result = !response.error ? true : false;
    console.log("### cloneSession", formData, result, response);

    getSessionList();
  };

  const deleteSession = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("session_delete.php", formData);
    const result = !response.error ? true : false;
    console.log("### deleteSession", formData, result, response);

    getSessionList();
  };

  const getPlayList = async () => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("id", "ALL");

    const response = await api.post("play_details.php", formData);
    console.log("### getPlayList response", response);

    const result = !response.error ? response.gymdata : [];
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    dispatch(setModPlayList(res));
    dispatch(setPlayUpdate(false));
    dispatch(setPlayList(result));
    dispatch(setPlayAdded(false));
  };

  const getCatBasedPlayList = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("get_catplay.php", formData);

    const result = !response.error ? response.gymdata : [];
    console.log("### getCatBasedPlayList", result);
    const res = result.map((el) => {
      return {
        label: el.name,
        value: el.id,
        key: el.id,
        content: el.content,
        category: el.category,
        type: el.type,
      };
    });

    dispatch(setCatBasedPlayList(res));
  };

  const getDisplayList = async () => {
    const formData = new FormData();
    formData.append("userid", user.userid);
    formData.append("displayid", "ALL");
    formData.append("gym", user.type == 1 ? "ALL" : user.gym);

    const response = await api.post("display_details.php", formData);
    console.log("### getDisplayList", user, formData, response);
    const result = !response.error ? response.gymdata : [];
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    dispatch(setDisplayDeleted(false));
    dispatch(setModDisplayList(res));
    dispatch(setDisplayList(result));
  };

  const getScheduleList = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("schedule_view.php", formData);
    console.log("### getScheduleList", user, formData, response);
    const result = !response.error ? response.gymdata : [];
    dispatch(setScheduleList(result));
    dispatch(setScheduleAdded(false));
  };

  const addCategory = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("category_create.php", formData);

    const result = !response.error ? true : false;
    getCategoryList();
    dispatch(setCategoryAdded(result));
  };

  const addGym = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("gym_create.php", formData);
    console.log("### addGym", data, response);
    const result = !response.error ? true : false;
    getGymList();
    dispatch(setGymAdded(result));
  };

  const updateGym = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("gym_edit.php", formData);
    console.log("### updateGym  response", formData, response);
    const result = !response.error ? true : false;
    getGymList();
    dispatch(setGymUpdate(result));
  };

  const deleteGym = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("gym_delete.php", formData);
    console.log("### deleteGym  response", formData, response);
    const result = !response.error ? true : false;
    getGymList();
    dispatch(setGymDeleted(result));
  };

  const addDisplay = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("display_create.php", formData);
    console.log("### addDisplay", data, response);

    const result = !response.error ? true : false;
    getDisplayList();
    dispatch(setDisplayAdded(result));
  };

  const deleteDisplay = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("display_delete.php", formData);
    console.log("### deleteDisplay", data, response);

    const result = !response.error ? true : false;
    getDisplayList();
    dispatch(setDisplayDeleted(result));
  };

  const updateCategory = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("category_edit.php", formData);

    const result = !response.error ? true : false;
    getCategoryList();
    dispatch(setCategoryUpdate(result));
  };

  const deleteCategory = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("category_delete.php", formData);
    console.log("### deleteCategory", data, response);

    // const result = !response.error ? true : false;
    getCategoryList();
  };

  const addPlay = async (data) => {
    // data.duration = parseFloat(data?.duration ?? 0);
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("play_add.php", formData);
    console.log("### addPlay", data, response);
    const result = !response.error ? true : false;
    dispatch(setPlayAdded(result));
    getPlayList();
  };

  const updatePlay = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("play_edit.php", formData);
    console.log("### updatePlay", data, response);
    const result = !response.error ? true : false;
    getPlayList();
    dispatch(setPlayUpdate(result));
  };

  const deletePlay = async (data) => {
    data = { ...data, userid: user.userid };
    const formData = getFormData(data);

    const response = await api.post("play_delete.php", formData);
    console.log("### deletePlay", data, response);
    getPlayList();
  };

  const assignSchedule = async (data) => {
    data = { ...data, userid: user.userid, status: 1 };
    const formData = getFormData(data);

    const response = await api.post("schedule_assign.php", formData);
    console.log("### assignSchedule", data, response);
    const result = !response.error ? true : false;

    dispatch(setScheduleAdded(result));
    getScheduleList({ gym: data.gym, sdate: data.sdate });
  };

  const getCityList = async () => {
    const data = { city: "ALL" };
    const formData = getFormData(data);

    const response = await api.post("get_city.php", formData);
    const result = !response.error ? response.citydata : [];
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    dispatch(setCity(res));
  };

  const getTimezoneList = async () => {
    const data = { timezone: "ALL" };
    const formData = getFormData(data);

    const response = await api.post("get_timezone.php", formData);
    const result = !response.error ? response.citydata : [];
    const res = result.map((el) => {
      return { label: el.name, value: el.id, key: el.id };
    });
    console.log("getTimezoneList", res, response);
    dispatch(setTimezone(res));
  };

  function getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach((key) => formData.append(key, object[key]));
    return formData;
  }

  return {
    user,
    gymList,
    categoryList,
    displayList,
    isGymUpdated,
    isCategoryUpdated,
    isPlayUpdated,
    cityList,
    playList,
    isDisplayAdded,
    isGymAdded,
    isCategoryAdded,
    timezoneList,
    modGymList,
    isPlayAdded,
    modCategoryList,
    isGymDeleted,
    isDisplayDeleted,
    sessionList,
    modPlayList,
    catPlayList,
    isSessionAdded,
    sessionPlayList,
    isSessionUpdated,
    sessionModList,
    scheduleList,
    displayModList,
    isScheduleAdded,
    getGymList,
    getCategoryList,
    getPlayList,
    updatePlay,
    getDisplayList,
    loginAPI,
    updateGym,
    addGym,
    updateCategory,
    getCityList,
    getTimezoneList,
    addDisplay,
    addCategory,
    addPlay,
    deleteGym,
    deleteCategory,
    deleteDisplay,
    getSessionList,
    cloneSession,
    deleteSession,
    getCatBasedPlayList,
    addSession,
    getSessionPlayList,
    updateSession,
    deletePlay,
    getScheduleList,
    assignSchedule,
  };
};
