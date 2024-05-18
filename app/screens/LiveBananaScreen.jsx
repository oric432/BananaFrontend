import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  ScrollView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { customAxiosFetch } from "../utils/api";
import { useFlag } from "../utils/FlagContext";
import ClassifiedImage from "../components/ClassifiedImage";
import ConfidenceSlider from "../components/ConfidenceSliders";

const LiveBananaScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setFlag } = useFlag();

  const getLiveUpdate = async () => {
    try {
      setLoading(true);
      const response = await customAxiosFetch.get("/bananas/get_status");
      setData(response.data);
      setFlag((prevFlag) => !prevFlag);
    } catch (error) {
      console.error("Error fetching image data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={getLiveUpdate}>
          <LinearGradient
            colors={["#4c669f", "#3b5998", "#192f6a"]}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>Get Live Update</Text>
          </LinearGradient>
        </TouchableOpacity>
        {loading && <Text>Loading...</Text>}
        {data && (
          <View style={styles.container}>
            <ClassifiedImage image={data.image} />
            <ConfidenceSlider data={data.classification} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    marginTop: 20,
    alignItems: "center",
  },
  container: {
    flex: 1,
    marginTop: 20,
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    marginBottom: 30,
  },
  button: {
    width: 150,
    height: 150,
    borderRadius: 75,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default LiveBananaScreen;
