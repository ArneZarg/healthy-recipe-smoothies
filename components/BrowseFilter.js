import SelectDropdown from "react-native-select-dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCaretDown } from "@fortawesome/free-solid-svg-icons/faCaretDown";
import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useRef } from "react";
import { RFPercentage } from "react-native-responsive-fontsize";

const BrowseFilter = ({ resetTrigger, options, defaultText, handler }) => {
  const dropDownRef = useRef({});
  useEffect(() => {
    if (resetTrigger) {
      dropDownRef.current.reset();
    }
  }, [resetTrigger]);
  return (
    <View>
      <Text style={styles.topText} />
      <SelectDropdown
        ref={dropDownRef}
        data={options}
        buttonStyle={styles.btnStyle}
        defaultButtonText={defaultText}
        onSelect={(selectedItem, index) => {
          switch (selectedItem) {
            case "Caramel":
              selectedItem = "Salted Caramel";
              break;
            case "Tropical Coconut":
              selectedItem = "Toasted Coconut";
              break;
            case "Brownies":
              selectedItem = "Brownie Bites";
              break;
            case "Keto Desserts":
              selectedItem = "Keto Dessert";
              break;
            case "Cakes":
              selectedItem = "Cake";
              break;
            default:
              selectedItem = selectedItem;
          }
          const sel = index === 0 ? "" : selectedItem;
          handler(sel);
        }}
        renderDropdownIcon={() => {
          return <FontAwesomeIcon icon={faCaretDown} />;
        }}
        buttonTextStyle={styles.btnTextStyle}
        buttonTextAfterSelection={(selectedItem, index) => {
          return selectedItem;
        }}
        rowTextForSelection={(item, index) => {
          return item;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  btnStyle: {
    height: RFPercentage(2.9),
    backgroundColor: "white",
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E6E6E6",
    width: "100%",
  },
  btnTextStyle: {
    fontSize: RFPercentage(1.6),
    textAlign: "left",
  },
});

export default BrowseFilter;
