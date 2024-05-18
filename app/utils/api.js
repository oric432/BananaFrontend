import axios from "axios";

export const customAxiosFetch = axios.create({
  baseURL:
    "https://72ae-2a06-c701-759d-f600-10f1-9354-ae23-1337.ngrok-free.app/banana-api/v1",
});
