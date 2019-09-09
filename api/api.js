import baseAPI from "./baseApi.js";
import config from "../config/config.js";
import interfaces from "../config/interfaces.js";

export default {
  IGetEncryptedData(params) {
    const result = baseAPI.request(config.BASE_URL + interfaces.INTERFACE_WXDECRYPTDATA, params);
    return result;
  },
}