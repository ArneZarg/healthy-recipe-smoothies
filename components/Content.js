import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
} from "react-native";
import RecipeBlock from "./RecipeBlock";
import axios from "axios";
import BrowseFilter from "./BrowseFilter";
import { extractData } from "../global-scripts/globalScripts";
import { RFPercentage } from "react-native-responsive-fontsize";

const Content = ({ getStorageData, handleToggle, activeSubMenu }) => {
  const [articles, setArticles] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingArticles, setLoadingArticles] = useState(false);
  const [selectedFlavors, setSelectedFlavors] = useState("");
  const [selectedTypes, setSelectedTypes] = useState("");
  const [refreshTriggered, setRefreshTriggered] = useState(false);
  const [filteringArticles, setFilteringArticles] = useState(false);

  const filterFlavors =
    activeSubMenu == "Smoothies"
      ? [
          "All Flavors",
          "Chocolate",
          "Vanilla",
          "Caramel",
          "Pumpkin Spice",
          "Strawberry",
          "Chocolate Mint",
          "Tropical Coconut",
          "Horchata",
          "Peppermint Swirl",
        ]
      : [
          "All Products",
          "Chocolate Shake",
          "Vanilla Shake",
          "Caramel Shake",
          "Pumpkin Spice Shake",
          "Gingerbread Shake",
          "Peanut Butter Powder",
          "Collagen Powder",
        ];
  const filterTypes =
    activeSubMenu == "Smoothies"
      ? [
          "All Types",
          "Keto Shakes",
          "Hot Shakes",
          "Coffee Shakes",
          "Green Shakes",
          "Fruity Shakes",
          "Dessert Shakes",
          "Holiday Shakes",
        ]
      : [
          "All Types",
          "Cookies",
          "Granola",
          "Ice Cream",
          "Muffins",
          "Pancakes",
          "Oatmeal",
          "Protein Bars",
          "Protein Balls",
          "Cakes",
          "Brownies",
          "Keto Desserts",
        ];

  const flatListRef = useRef(null);

  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ animated: true, offset: 0 });
  };

  const loadArticles = async () => {
    try {
      const response = await axios.get(
        `http://310nutrition.com/blogs/recipes-json/tagged/${
          activeSubMenu == "Smoothies" ? "shake_recipes" : "baked_recipes"
        }+?page=1`
      );
      let data = extractData(response.data);
      let recipes = data.recipes;
      setArticles(recipes);
    } catch (error) {
      console.log(error);
    }
    setLoadingArticles(false);
  };

  const loadMoreArticles = async () => {
    setLoadingArticles(true);

    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    const selectedTags =
      selectedFlavors.split(" ").join("_") +
      "+" +
      selectedTypes.split(" ").join("_");
    const url = `http://310nutrition.com/blogs/recipes-json/tagged/${
      activeSubMenu == "Smoothies" ? "shake_recipes" : "baked_recipes"
    }+${selectedTags}?page=${nextPage}`;
    try {
      const response = await axios.get(url);
      let data = extractData(response.data);
      data.recipes.forEach((recipe) =>
        setArticles((currentArticles) => [...currentArticles, recipe])
      );
    } catch (error) {
      Alert.alert("End of Recipes", "There are no more recipes to show.", [
        { text: "Close", style: "destructive" },
      ]);
    }
    setLoadingArticles(false);
  };

  const selectFlavorHandler = (flavor) => {
    setRefreshTriggered(false);
    setSelectedFlavors(flavor);
  };

  const filterRecipes = async () => {
    setLoadingArticles(true);
    setFilteringArticles(true);
    const activeType = selectedTypes.split(" ").join("_");
    const activeFlavor = selectedFlavors.split(" ").join("_");
    const selectedTags = activeFlavor + "+" + activeType;
    const url = `http://310nutrition.com/blogs/recipes-json/tagged/${
      activeSubMenu == "Smoothies" ? "shake_recipes" : ""
    }+${selectedTags == "+" ? "baked_recipes" : ""}+${selectedTags}?page=1`;

    try {
      const response = await axios.get(url);
      let data = extractData(response.data);
      setArticles(data.recipes);
      setLoadingArticles(false);

      setCurrentPage(1);
    } catch (error) {
      Alert.alert(
        "No Recipes With This Flavor",
        "There are no more of this flavor.",
        [{ text: "Close", style: "destructive" }]
      );
      console.log(error);
    }
    scrollToTop();
    setLoadingArticles(false);
    setFilteringArticles(false);
  };

  const clearFilters = () => {
    setLoadingArticles(true);
    setSelectedTypes("");
    setSelectedFlavors("");
    setCurrentPage(1);
    scrollToTop();
    setRefreshTriggered(true);
    loadArticles();
  };

  const selectTypeHandler = async (type) => {
    setRefreshTriggered(false);
    setSelectedTypes(type);
  };

  const storagePass = () => {
    getStorageData(true);
  };

  useEffect(() => {
    clearFilters();
  }, [activeSubMenu]);

  return (
    <View style={styles.contentView}>
      <View
        style={
          loadingArticles
            ? [styles.loading, styles.articleView]
            : styles.articleView
        }
      >
        <FlatList
          style={{ maxHeight: "100%" }}
          data={articles}
          ref={flatListRef}
          renderItem={({ item }) => (
            <RecipeBlock dataProps={item} handleToggle={handleToggle} />
          )}
          keyExtractor={(item, index) => item.handle}
          ListFooterComponent={
            <View>
              <Pressable
                disabled={loadingArticles}
                style={styles.showMore}
                onPress={() => loadMoreArticles()}
              >
                <Text style={styles.showMoreText}>
                  {loadingArticles ? "Loading Recipes..." : "Show More Recipes"}
                </Text>
              </Pressable>
            </View>
          }
        />
      </View>
      <View style={styles.filterContainer}>
        <BrowseFilter
          defaultText={
            activeSubMenu == "Smoothies" ? "All Flavors" : "All Products"
          }
          topText="Shake Flavors"
          options={filterFlavors}
          handler={selectFlavorHandler}
          resetTrigger={refreshTriggered}
        />
        <BrowseFilter
          defaultText="All Types"
          topText="Shake Type"
          options={filterTypes}
          handler={selectTypeHandler}
          resetTrigger={refreshTriggered}
        />
        <View style={styles.bottomButtons}>
          <Pressable
            disabled={loadingArticles}
            style={[styles.clear, styles.filterButtonsSharedStyles]}
            onPress={clearFilters}
          >
            <Text style={styles.clearText}>Clear</Text>
          </Pressable>
          <Pressable
            disabled={loadingArticles}
            style={[styles.filter, styles.filterButtonsSharedStyles]}
            onPress={filterRecipes}
          >
            <Text style={styles.filterText}>
              {filteringArticles ? "Filtering Recipes..." : "Filter Recipes"}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentView: {
    flex: 1,
    marginVertical: "2%",
  },
  articleView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  showMore: {
    marginTop: 5,
    alignSelf: "center",
    padding: 10,
    marginBottom: 20,
    borderRadius: 20,
    backgroundColor: "#F2F2F2",
    width: "75%",
    maxWidth: 250,
  },
  showMoreText: {
    fontWeight: "bold",
    fontSize: RFPercentage(1.45),
    color: "#9A9A9A",
    textAlign: "center",
  },
  loading: {
    opacity: 0.7,
  },
  // filter styles
  filterContainer: {
    width: "100%",
    paddingHorizontal: 15,
    backgroundColor: "#F5F5F5",
    paddingBottom: 10,
  },
  bottomButtons: {
    display: "flex",
    flexDirection: "row",
    paddingTop: 10,
  },
  filterButtonsSharedStyles: {
    width: "100%",
    paddingTop: 8,
    paddingBottom: 8,
    borderRadius: 20,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  clear: {
    flex: 0.3,
    backgroundColor: "white",
  },
  filter: {
    flex: 0.7,
    backgroundColor: "#679f47",
    marginLeft: 5,
  },
  clearText: {
    color: "black",
    fontSize: RFPercentage(1.45),
  },
  filterText: {
    color: "white",
    fontSize: RFPercentage(1.45),
  },
});

export default Content;
