import axios from "axios";

export const uploadFileToGoogleStorage = async (file, signedUrl) => {
  const res = await axios.put(signedUrl, file, {
    headers: {
      "Content-Type": file.type,
    },
  });
  return res;
};
