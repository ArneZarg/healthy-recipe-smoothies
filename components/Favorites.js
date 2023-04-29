import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  Pressable,
  AsyncStorage,
} from "react-native";
import RecipeBlock from "./RecipeBlock";
import { checkStorage, clearStorage } from "../global-scripts/storage";

const Favorites = ({ favorites, handleToggle }) => {
  if (favorites.length === 0) {
    return (
      <View style={styles.noFavoritesContainer}>
        <Text style={styles.topTxt}>No Favorites Yet!</Text>
        <Text style={styles.bottomTxt}>
          To save your favorite Smoothies, hit the heart icon on any recipe!
        </Text>
      </View>
    );
  } else {
    return (
      <View style={styles.articleView}>
        <FlatList
          style={{ maxHeight: "100%" }}
          data={favorites}
          renderItem={({ item }) => (
            <RecipeBlock dataProps={item} handleToggle={handleToggle} />
          )}
          keyExtractor={(item, index) => item.handle}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  noFavoritesContainer: {
    flex: 1,
    alignItems: "center",
    marginTop: "20%",
  },
  topTxt: {
    fontWeight: "bold",
    fontSize: 20,
    marginBottom: 20,
    maxWidth: 250,
  },
  bottomTxt: {
    textAlign: "center",
    maxWidth: 250,
  },
  articleView: {
    flex: 1,
    paddingHorizontal: 20,
  },
});

export default Favorites;
