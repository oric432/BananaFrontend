import { StyleSheet, Text, View } from "react-native";
import ClassifiedImage from "../components/ClassifiedImage";
import ConfidenceSlider from "../components/ConfidenceSliders";
const ImageStatsScreen = ({ navigation, route }) => {
  const data = route.params.imageData;

  return (
    <View style={styles.container}>
      <Text>Image</Text>
      <ClassifiedImage image={data.image} />
      <ConfidenceSlider data={data.classification} />
    </View>
  );
};
export default ImageStatsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
