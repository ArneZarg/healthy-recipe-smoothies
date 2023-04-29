import React from "react";
import { View, Pressable, Text, StyleSheet } from "react-native";

const SubMenu = ({ activeSubMenu, handleActiveSubMenu }) => {
  return (
    <View style={styles.subMenu}>
      <View style={styles.btnsContainer}>
        <Pressable
          onPress={() => {
            handleActiveSubMenu("Smoothies");
          }}
          style={
            activeSubMenu == "Smoothies"
              ? [styles.activeSub, styles.subBtn]
              : styles.subBtn
          }
        >
          <Text style={styles.subMenuBtn}>Smoothies</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            handleActiveSubMenu("Desserts & Baked");
          }}
          style={
            activeSubMenu == "Desserts & Baked"
              ? [styles.activeSub, styles.subBtn]
              : styles.subBtn
          }
        >
          <Text style={styles.subMenuBtn}>Desserts & Baked</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  subMenu: {
    backgroundColor: "#7ea65c",
    paddingHorizontal: 20,
    paddingBottom: 13,
  },
  btnsContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  subBtn: {
    paddingBottom: 3,
    marginRight: 15,
  },
  activeSub: {
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  subMenuBtn: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default SubMenu;
