import axios from "axios";
import { API_NOTIFICATION_MESSAGE, SERVICE_URLS } from "../constants/config";
import { getAccessToken, getType } from "../utils/comman-utlis";

const API_URL = "http://localhost:8000";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Accept": "application/json, form-data", 
    "Content-Type": "application/json"
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    if(config.TYPE.params){
      config.params = config.TYPE.params
    } else if (config.TYPE.query){
      config.url = config.url + '/' + config.TYPE.query
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here
    return processResponse(response);
  },
  function (error) {
    // stop global loader here
    return Promise.reject(processError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const processError = (error) => {
    if (error.response) {
        // Error response received (non-2xx status)
        console.log('Error in response', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.responseFailure,
            code: error.response.status
        }
    } else if (error.request) {
        // No response received
        console.log('Error in request', error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.requestFailure,
            code: ""
        }
    } else {
        // Something went wrong in setting up the request
        console.log('Error in Network',error.toJSON());
        return{
            isError: true,
            msg: API_NOTIFICATION_MESSAGE.networkError,
            code: ""
        }
    }
};

const API={};

for (const [key, value] of Object.entries(SERVICE_URLS)){
    API[key] = (body, showUploadProgress, showDownloadprogress) =>
        axiosInstance({
            method: value.method,
            url: value.url,
            data: value.method === 'DELETE' ? {} : body,
            responseType: value.responseType,
            headers: {
              authorization: getAccessToken()
            },
            // credentials: 'include',
            TYPE: getType(value, body),
            onUploadProgress: function(progressEvent){
                if(showUploadProgress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/ progressEvent.total)
                    showUploadProgress(percentageCompleted);
                }
            },
            onDownloadProgress: function (progressEvent){
                if(showDownloadprogress){
                    let percentageCompleted = Math.round((progressEvent.loaded * 100)/progressEvent.total)
                    showDownloadprogress(percentageCompleted);
                }
            }
        })
    
}


export {API};
