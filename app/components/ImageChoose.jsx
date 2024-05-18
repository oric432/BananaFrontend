import { Button, Image, View, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function ImageChoose({ setImage, setImageSize }) {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSize({
        width: result.assets[0].width,
        height: result.assets[0].height,
      });
    }
  };

  const takePhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access camera was denied");
      return;
    }

    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImageSize({
        width: result.assets[0].width,
        height: result.assets[0].height,
      });
    }
  };

  return (
    <View style={styles.buttonContainer}>
      <Button title="Pick from Camera Roll" onPress={pickImage} />
      <Button title="Take a Photo" onPress={takePhoto} />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "column",
    justifyContent: "space-around",
    marginBottom: 20,
  },
});
