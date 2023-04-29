import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Pressable } from "react-native";
import RecipeModal from "./RecipeModal";
import { extractData } from "../global-scripts/globalScripts";
import { RFPercentage } from "react-native-responsive-fontsize";
import axios from "axios";

const RecipeBlock = ({ dataProps, handleToggle }) => {
  const [modalActive, setModalActive] = useState(false);
  const [articleContent, setArticleContent] = useState(false);

  const getArticleContent = async () => {
    const articleHandle = dataProps.handle;
    const url = `https:310nutrition.com/blogs/${articleHandle}`;
    try {
      const response = await axios.get(url);
      let data = extractData(response.data);
      setArticleContent(data.article_content);
    } catch (error) {
      console.log(error);
    }
  };
  const decodeHTML = (str) => {
    const entities = {
      "&amp;": "&",
      "&lt;": "<",
      "&gt;": ">",
      "&quot;": '"',
      "&#x27;": "'",
      "&#x60;": "`",
      "&#39;": "'",
    };

    return str.replace(
      /&amp;|&lt;|&gt;|&quot;|&#x27;|&#x60;|&#39;/g,
      (match) => {
        return entities[match];
      }
    );
  };
  const pressHandler = () => {
    setModalActive(modalActive ? false : true);
    getArticleContent();
  };
  if (dataProps.handle !== "") {
    return (
      <View>
        <Pressable onPress={pressHandler}>
          <View style={styles.recipeBlock}>
            <View style={styles.recipeTextContainer}>
              <View>
                <Text style={styles.title}>{decodeHTML(dataProps.title)}</Text>
              </View>
              <View>
                <Text style={styles.description}>
                  {dataProps.excerpt.substring(0, 50) + "..."}
                </Text>
              </View>
            </View>
            <View style={styles.imageContainer}>
              <Image
                resizeMode="cover"
                style={styles.featuredImage}
                source={{
                  uri: `https:${dataProps.featured_image}`,
                }}
              />
            </View>
          </View>
        </Pressable>
        <RecipeModal
          visible={modalActive}
          data={dataProps}
          content={articleContent}
          closeHandler={pressHandler}
          handleToggle={handleToggle}
        />
      </View>
    );
  } else {
    return null;
  }
};
const styles = StyleSheet.create({
  recipeBlock: {
    flexDirection: "row",
    marginVertical: 5,
  },
  title: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    textAlign: "left",
    marginTop: "15%",
  },
  description: {
    textAlign: "left",
    fontSize: RFPercentage(1.75),
    color: "#AAAAAA",
  },
  recipeTextContainer: {
    flex: 7,
  },
  imageContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 4,
    aspectRatio: 1,
  },
  featuredImage: {
    height: "95%",
    width: "95%",
    borderRadius: 15,
  },
});

export default RecipeBlock;
