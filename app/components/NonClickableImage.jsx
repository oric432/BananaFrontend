import React, { useState } from "react";
import { View, Image, StyleSheet, ActivityIndicator } from "react-native";

const NonClickableImage = ({ source, style }) => {
  const [loading, setLoading] = useState(false);

  return (
    <View>
      <Image
        source={source}
        style={style}
        onLoadStart={() => setLoading(true)}
        onLoadEnd={() => setLoading(false)}
      />
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default NonClickableImage;
