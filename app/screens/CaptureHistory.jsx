import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  Dimensions,
  Text,
} from "react-native";
import { customAxiosFetch } from "../utils/api";
import { useFlag } from "../utils/FlagContext";
import NonClickableImage from "../components/NonClickableImage";

const CaptureHistory = ({ navigation }) => {
  const [imagesData, setImagesData] = useState([]);
  const screenWidth = Dimensions.get("window").width;
  const { flag } = useFlag();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await customAxiosFetch.get("/bananas/all_data");
        setImagesData(response.data);
      } catch (error) {
        console.error("Error fetching image data:", error);
      }
    };
    fetchData();
  }, [flag]);

  const calculateDimensions = ({ width, height }) => {
    const padding = 20;
    const availableWidth = screenWidth - 2 * padding; // Subtract padding from both sides
    const aspectRatio = width / height;
    const calculatedWidth = availableWidth;
    const calculatedHeight = availableWidth / aspectRatio;
    return { width: calculatedWidth, height: calculatedHeight };
  };
  const handleImagePress = (imageData) => {
    navigation.navigate("Image Stats", { imageData });
  };

  console.log(imagesData);

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        {imagesData.map((arr, index) => {
          return (
            <TouchableOpacity
              onPress={() => handleImagePress(arr)}
              style={{ alignItems: "center", gap: 5 }}
            >
              <NonClickableImage
                source={arr.image}
                key={index}
                style={calculateDimensions(arr.image)}
              />
              <Text>{arr.date}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default CaptureHistory;
const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
    alignItems: "center",
  },
  container: {
    marginBottom: 30,
  },
});
