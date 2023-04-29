import Content from "./Content";
import Favorites from "./Favorites";
import React, { useEffect, useState, useRef } from "react";
import { checkStorage, clearStorage } from "../global-scripts/storage";
const MainView = ({ currentView, activeSubMenu }) => {
  const [favorites, setFavorites] = useState([]);
  const [handleChanged, setHandleChanged] = useState("");
  const previousHandle = useRef("");

  const removedHandle = (handle) => {
    setHandleChanged(handle);
  };

  const initFavorites = async () => {
    const arr = [];
    const data = await checkStorage();
    for (const key in data) {
      arr.push(data[key]);
    }

    setFavorites(arr);
  };

  // useEffect(async () => {
  //   // await clearStorage();
  // }, []);

  useEffect(() => {
    if (
      previousHandle.current !== handleChanged ||
      previousHandle.current !== removedHandle
    ) {
      initFavorites();
      previousHandle.current = handleChanged;
    }
  }, [removedHandle, handleChanged]);

  if (currentView === "browse") {
    return (
      <Content activeSubMenu={activeSubMenu} handleToggle={removedHandle} />
    );
  }
  if (currentView === "favorites") {
    return <Favorites favorites={favorites} handleToggle={removedHandle} />;
  }
};

export default MainView;
