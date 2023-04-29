import React, { useState, useEffect } from "react";
import { checkIfFavorite, toggleFavorite } from "../global-scripts/storage";
import RenderHtml from "react-native-render-html";
import { RFPercentage } from "react-native-responsive-fontsize";
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Image,
  ScrollView,
  SafeAreaView,
  Pressable,
  useWindowDimensions,
} from "react-native";

const RecipeModal = ({
  visible,
  data,
  closeHandler,
  content,
  handleToggle,
}) => {
  const [isFavorited, setIsFavorite] = useState(false);

  const { width } = useWindowDimensions();
  const source = { html: content };
  const getFavorite = async () => {
    const faved = await checkIfFavorite(data.handle);
    setIsFavorite(!faved);
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
  const checkFav = async () => {
    const faved = await checkIfFavorite(data.handle);

    setIsFavorite(faved);
  };

  useEffect(() => {
    checkFav();
  }, []);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      style={styles.modalParentContainer}
    >
      <View style={styles.imageHeader}>
        <Image
          style={styles.modalImage}
          source={{
            uri: `https:${data.featured_image}`,
          }}
        />
        <View style={styles.closeButton}>
          <Pressable
            onPress={() => {
              closeHandler();
            }}
          >
            <Image
              style={styles.closeButtonImg}
              source={require("../assets/left-arrow-green.png")}
            ></Image>
          </Pressable>
        </View>
      </View>
      <SafeAreaView style={styles.infoContainer}>
        <View style={styles.modalWhite}>
          <View style={styles.headerContainer}>
            <View style={styles.headerTextContainer}>
              <Text style={styles.modalTitle}>{decodeHTML(data.title)}</Text>
            </View>
            <View style={styles.favorite}>
              <Pressable
                onPress={() => {
                  getFavorite();
                  toggleFavorite(data);
                  handleToggle(data.handle);
                }}
              >
                <Image
                  style={styles.heart}
                  source={
                    isFavorited
                      ? require("../assets/active-favorites-icon.png")
                      : require("../assets/inactive-favorites-icon.png")
                  }
                />
              </Pressable>
              <Text style={styles.favoriteText}>Favorite</Text>
            </View>
          </View>
          <View style={styles.mainRecipeContent}>
            <ScrollView>
              <View>
                <RenderHtml contentWidth={width} source={source} />
              </View>
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalParentContainer: {
    flex: 1,
  },
  infoContainer: {
    flex: 8,
  },
  modalWhite: {
    backgroundColor: "#fff",
    marginBottom: 10,
    borderRadius: 5,
    flex: 1,
  },
  modalTitle: {
    fontSize: RFPercentage(2.5),
    fontWeight: "bold",
    textAlign: "left",
  },
  headerContainer: {
    backgroundColor: "#f7f7f7",
    paddingHorizontal: 25,
    paddingVertical: RFPercentage(1.5),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    width: "70%",
  },
  heart: {
    width: RFPercentage(3.25),
    height: RFPercentage(3.25),
  },
  favorite: {
    alignItems: "center",
    justifyContent: "center",
  },
  favoriteText: {
    fontWeight: "600",
    fontSize: RFPercentage(2.25),
    marginTop: 5,
  },
  modalImage: {
    width: "100%",
    height: "100%",
  },
  closeButton: {
    position: "absolute",
    borderRadius: 3,
    left: 20,
    top: RFPercentage(6),
    shadowOffset: { width: 0, height: 1 },
    shadowColor: "#f7f7f7",
    shadowOpacity: 0.8,
    shadowRadius: 1,
  },
  closeButtonImg: {
    width: RFPercentage(6),
    height: RFPercentage(6),
  },
  imageHeader: {
    position: "relative",
    flex: 2,
  },
  mainRecipeContent: {
    paddingHorizontal: RFPercentage(4),
    paddingVertical: 8,
    flex: 8,
  },
});

export default RecipeModal;
