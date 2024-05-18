import { useState } from "react";
import { customAxiosFetch } from "../utils/api";
import { useFlag } from "../utils/FlagContext";

const useImageUpload = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const { setFlag } = useFlag();

  const uploadImage = async (image) => {
    setLoading(true);
    setError(null);
    setData(null);

    if (!image) {
      setError("Please select an image first");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("file", {
      uri: image,
      type: "image/jpg",
      name: "image.jpg",
    });

    try {
      const response = await customAxiosFetch.post(
        "/bananas/upload_image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setData(response.data);
      setFlag((prevFlag) => !prevFlag);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, data, uploadImage };
};

export default useImageUpload;
