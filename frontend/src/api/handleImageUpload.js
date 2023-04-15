import axios from "axios";
const BASE_URL = "http://127.0.0.1:5000/api/upload";

export const handleImageUpload = async (setIsLoading, image) => {
  setIsLoading(true);

  try {
    const formData = new FormData();
    formData.append("image", image);

    const response = await axios.post(BASE_URL, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  } catch (error) {
    console.log(error.message);
  } finally {
    setIsLoading(false);
  }
};
