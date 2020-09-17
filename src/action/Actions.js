import {
  login,
  logout,
  signup,
  getUserMe,
  updateProfile,
} from "./authenticate";
import {
  getData,
  getFiles,
  getIntermediateData,
  uploadFile,
} from "./data";

const Actions = {
  login,
  logout,
  signup,
  getUserMe,
  updateProfile,

  getData,
  getFiles,
  getIntermediateData,
  uploadFile,
};

export default Actions;
