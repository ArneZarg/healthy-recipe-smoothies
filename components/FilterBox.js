import React from "react";
import { StyleSheet, Text, Image, View } from "react-native";

const FilterBox = () => {
  return (
    <View style={styles.filterContainer}>
      <View style={[styles.containerOne, styles.center]}>
        <Text style={styles.topText}>Shake Flavor</Text>
        <Text style={styles.bottomText}>All Flavors</Text>
      </View>
      <View style={[styles.containerTwo, styles.center]}>
        <Text style={styles.topText}>Shake Type</Text>
        <Text style={styles.bottomText}>All Types</Text>
      </View>
      <View style={[styles.containerThree, styles.center]}>
        <Image
          source={require("../assets/filter-icon.png")}
          style={styles.filterImage}
        />
        <Text style={styles.containerThreeText}>FILTER</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    borderRadius: 20,
    borderColor: "#679f47",
    borderWidth: 1,
    width: "80%",
    maxWidth: 300,
    height: 100,
  },
  topText: {
    fontSize: 11,
  },
  bottomText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  filterButton: {
    textAlign: "center",
  },
  containerOne: {
    flex: 3,
    borderEndWidth: 1,
    borderColor: "black",
  },
  containerTwo: {
    flex: 3,
  },
  containerThree: {
    flex: 2,
    backgroundColor: "#679f47",
    height: "100%",
    width: "100%",
    borderBottomRightRadius: 18,
    borderTopRightRadius: 18,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerThreeText: {
    color: "white",
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  filterImage: {
    height: "30%",
    width: "30%",
  },
});

export default FilterBox;
