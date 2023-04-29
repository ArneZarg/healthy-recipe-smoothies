import AsyncStorage from "@react-native-async-storage/async-storage";

export const checkIfFavorite = async (handle) => {
  const res = await AsyncStorage.getItem("favorites");

  if (res === null) return false;

  const data = await JSON.parse(res);

  return data[handle] === undefined ? false : true;
};

export const toggleFavorite = async (data) => {
  // check if first time / if dict objet exists
  const res = await AsyncStorage.getItem("favorites");
  if (res !== null) {
    const obj = JSON.parse(res);
    // check if data handle exists in object

    if (obj[data.handle] !== undefined && obj[data.handle] !== null) {
      removeFavorite(data.handle);
    } else {
      addFavorite(data.handle, data);
    }
  } else {
    addFavorite(data.handle, data);
  }
};

export const addFavorite = async (handle, data) => {
  // console.table("adding: ", favorites);
  // favorites[handle] = data;
  const res = await AsyncStorage.getItem("favorites");
  if (res !== null) {
    const obj = JSON.parse(res);

    const favorites = obj;
    favorites[handle] = data;
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  } else {
    const favorites = {};
    favorites[handle] = data;
    await AsyncStorage.setItem("favorites", JSON.stringify(favorites));
  }
};

export const removeFavorite = async (handle) => {
  const res = await AsyncStorage.getItem("favorites");

  // check if the favorite object exists
  if (res === null) return;

  // if it exists, parse back to json
  const data = JSON.parse(res);

  // update object by deleting
  delete data[handle];
  // delete favorites[handle];

  // remove entire favorite from async storage
  await AsyncStorage.removeItem("favorites");

  // set new favorite storage object to updated object
  await AsyncStorage.setItem("favorites", JSON.stringify(data));
};

export const getFavorite = async (handle) => {
  try {
    const data = await AsyncStorage.getItem(handle);
    if (data !== null) {
    }
  } catch (err) {
    console.log(err);
  }
};

// utility

export const clearStorage = async () => {
  await AsyncStorage.clear();
};

export const checkStorage = async () => {
  const favorites = await AsyncStorage.getItem("favorites");

  const obj = JSON.parse(favorites);

  return obj;
};
