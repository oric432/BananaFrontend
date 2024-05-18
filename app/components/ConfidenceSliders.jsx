import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Slider from "@react-native-community/slider"; // Updated import statement

const ConfidenceSlider = ({ data }) => {
  const getColor = (confidence) => {
    if (confidence < 0.3) {
      return "red";
    } else if (confidence < 0.6) {
      return "yellow";
    } else {
      return "green";
    }
  };

  return (
    <View style={styles.bigContainer}>
      <Text style={styles.title}>Stats</Text>
      <View style={styles.container}>
        {data.length === 0 && <Text>Objects to classify were not found!</Text>}
        {data.map((item, index) => (
          <View key={index} style={styles.sliderContainer}>
            <Text>
              {item.index}-{item.label}
            </Text>
            <View style={styles.sliderWrapper}>
              <Slider
                style={styles.slider}
                minimumValue={0}
                maximumValue={1}
                value={item.confidence}
                minimumTrackTintColor={getColor(item.confidence)}
                maximumTrackTintColor="transparent" // Hide the track
                thumbTintColor="transparent" // Hide the thumb
                disabled
              />
            </View>
            <Text>{item.confidence.toFixed(2)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    gap: 5,
  },
  sliderContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  sliderWrapper: {
    width: 200,
    height: 20, // Adjust the height of the wrapper to make the slider thicker
    justifyContent: "center",
  },
  slider: {
    width: "100%",
    height: "100%", // Match the height of the wrapper to make the slider thicker
  },
  bigContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
    padding: 20,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
});

export default ConfidenceSlider;
