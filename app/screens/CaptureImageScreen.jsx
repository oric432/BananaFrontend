import React, { useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import ImageChoose from "../components/ImageChoose";
import NiceButton from "../components/NiceButton";
import useImageUpload from "../hooks/useImageUpload";
import ClassifiedImage from "../components/ClassifiedImage";
import ClickableImage from "../components/ClickableImage";
import ConfidenceSliders from "../components/ConfidenceSliders";

const CaptureImageScreen = () => {
  const [image, setImage] = useState(null);
  const [imageSize, setImageSize] = useState({ width: null, height: null });
  const { loading, error, data, uploadImage } = useImageUpload();

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.container}>
        <ImageChoose setImage={setImage} setImageSize={setImageSize} />
        {image && imageSize.width && (
          <ClickableImage
            source={{ uri: image }}
            style={{
              width: imageSize.width,
              height: imageSize.height,
              marginBottom: 20,
            }}
            resizeMode={"contain"}
          />
        )}
        <NiceButton title="Upload Image" onPress={() => uploadImage(image)} />
        {loading && <Text>Loading...</Text>}
        {error && <Text>Error: {error}</Text>}
        {data && (
          <View style={styles.container}>
            <Text>Image uploaded successfully!</Text>
            <ClassifiedImage image={data.image} />
            <ConfidenceSliders data={data.classification} />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default CaptureImageScreen;

const styles = StyleSheet.create({
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    marginTop: 20,
  },
  image: {
    marginBottom: 20,
  },
});
