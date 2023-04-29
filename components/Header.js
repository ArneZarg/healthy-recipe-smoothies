import { View, Text, StyleSheet } from "react-native";
import { RFPercentage } from "react-native-responsive-fontsize";

const Header = ({ headerTitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>{headerTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#7ea65c",
  },
  headerTitle: {
    textTransform: "capitalize",
    fontWeight: "bold",
    fontSize: RFPercentage(2.5),
    paddingTop: 30,
    textAlign: "center",
    color: "white",
  },
});

export default Header;
