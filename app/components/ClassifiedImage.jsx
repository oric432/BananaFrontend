import { StyleSheet, Text, View } from "react-native";
import ClickableImage from "./ClickableImage";

const ClassifiedImage = ({ image }) => {
  return (
    <View style={styles.container}>
      <Text>Classified Image</Text>
      <ClickableImage
        source={{ uri: image.url }}
        style={{ width: image.width, height: image.height, marginBottom: 20 }}
        resizeMode="contain"
      />
    </View>
  );
};

export default ClassifiedImage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});
