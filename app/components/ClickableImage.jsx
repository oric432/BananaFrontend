import React, { useState } from "react";
import {
  View,
  Image,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const ClickableImage = ({ source, style, resizeMode }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const screenWidth = Dimensions.get("window").width;

  const calculateDimensions = () => {
    const padding = 20;
    const availableWidth = screenWidth - 2 * padding; // Subtract padding from both sides
    const aspectRatio = style.width / style.height;
    const calculatedWidth = availableWidth;
    const calculatedHeight = availableWidth / aspectRatio;
    return { width: calculatedWidth, height: calculatedHeight };
  };

  return (
    <View>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={source}
          style={[style, calculateDimensions()]}
          resizeMode={resizeMode}
          onLoadStart={() => setLoading(true)}
          onLoadEnd={() => setLoading(false)}
        />
        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Ionicons name="close-circle" size={30} color="white" />
          </TouchableOpacity>
          <Image
            source={source}
            style={[styles.modalImage, calculateDimensions()]}
            resizeMode="contain"
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
  },
  closeButton: {
    position: "absolute",
    top: 40,
    right: 20,
    zIndex: 1,
  },
  modalImage: {
    flex: 1,
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ClickableImage;
