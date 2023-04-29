import React, { useState } from "react";
import { StyleSheet, View, Pressable } from "react-native";
import MainView from "./components/MainView";
import Header from "./components/Header";
import SubMenu from "./components/SubMenu";
import RenderFooterIcon from "./components/RenderFooterIcon";

export default function App() {
  const [activeTab, setActiveTab] = useState("browse");
  const [activeSubMenu, setActiveSubMenu] = useState("Smoothies");

  const changeSubMenu = (subMenuName) => {
    setActiveSubMenu(subMenuName);
  };

  const Tab = (props) => {
    return (
      <Pressable
        style={styles.tab}
        onPress={() => {
          setActiveTab(props.tabName);
        }}
      >
        <RenderFooterIcon tabName={props.tabName} active={activeTab} />
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Header headerTitle={activeTab} />
      </View>
      {activeTab == "browse" ? (
        <SubMenu
          activeSubMenu={activeSubMenu}
          handleActiveSubMenu={changeSubMenu}
        />
      ) : null}
      <View style={styles.mainViewContainer}>
        <MainView currentView={activeTab} activeSubMenu={activeSubMenu} />
      </View>
      <View
        style={
          activeTab === "browse"
            ? [styles.bottomMenuBar, styles.whiteMenu]
            : [styles.bottomMenuBar, styles.grayMenu]
        }
      >
        <Tab tabName="browse" active={activeTab} />
        <Tab tabName="favorites" active={activeTab} />
      </View>
    </View>
  );
}

// styles

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
  },
  mainViewContainer: {
    flex: 8,
  },
  bottomMenuBar: {
    flex: 0.8,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    width: "100%",
  },
  whiteMenu: {
    backgroundColor: "#FFF",
  },
  grayMenu: {
    backgroundColor: "#F5F5F5",
  },
  tab: {
    display: "flex",
  },
});
