import http from "./httpService";
import { apiUrl } from "../config/config.json";
const apiEndpoint = apiUrl + "/attachments";

export const saveAttachments = (files, type, id, onUploadProgress) => {
  const formData = new FormData();
  for (let x = 0; x < files.length; x++) {
    formData.append("attachments", files[x]);
  }
  formData.append("type", type);
  http.put(apiEndpoint + "/" + id, formData, { onUploadProgress });
};

export const deleteAttachments = async (filePath, id, type) => {
  await http.delete(apiEndpoint + "/" + id + "/" + type + "/" + filePath);
};
