import axios from "axios";
import querystring from "querystring";
import _ from "@lodash";
import Constants from "app/utils/Constants";

import SessionService from "app/services/SessionService";
import ApiUrl from "app/services/ApiUrl";
import Cookie from "js-cookie";
//import { getLinkOnLogoClick } from "utils/Utils";
//import { AccessDeniedHelper, NotifyFn } from "components/helper";

//redux
import store from "app/store";
import { setIsAuth } from "app/auth/store/actions";
import { showMessage } from "app/store/actions";

const isProd = false;

let axiosInstance = null; // singleton object ref

export default class BaseService {
  constructor(options) {
    this.sessionService = SessionService;
    this.registerInterceptors();
  }

  getAxiosInstance() {
    return axiosInstance;
  }

  apiCall(config, options) {
    let opt = _.merge({}, config, options);
    let { url, ...rest } = opt;
    return this.getAxiosInstance().request({ cUrl: url, ...rest });
  }

  registerInterceptors() {
    // Add a request interceptor
    if (!axiosInstance) {
      axiosInstance = axios.create();
      axiosInstance.interceptors.request.use(this.beforeCallInterceptors, function (error) {
        // Do something with request error
        return Promise.reject(error);
      });
      axiosInstance.interceptors.response.use(
        this.onResponseInterceptors,
        this.onErrorInterceptors
      );
    }
    // const CancelToken = axiosInstance.CancelToken;
    // const source = CancelToken.source();
    // this.requestInterceptor = axiosInstance.interceptors.request.use(this.beforeCallInterceptors, function (error) {
    //   // Do something with request error
    //   return Promise.reject(error);
    // });
    // Add a response interceptor
    //this.responseInterceptor = axiosInstance.interceptors.response.use(this.onResponseInterceptors, this.onErrorInterceptors);
  }

  unregisterInterceptors() {
    //axiosInstance.interceptors.request.eject(this.requestInterceptor);
    //axiosInstance.interceptors.response.eject(this.responseInterceptor);
  }

  checkStatus(response) {
    // 3. Based on the status send promise state.
    if (response.status >= 200 && response.status < 300) {
      if (!isProd) {
        //console.log(this.constructor.name + "_Sucess=>" + response.config.url, response.data);
      }
      return response;
    } else {
      //console.log(this.constructor.name + "_Errror=>" + response.config.url, response);
      return this.onErrorInterceptors(response);
      // throw error
    }
  }

  parseJSON(response) {
    return Promise.resolve(response);
  }

  onResponseInterceptors = response => {
    // 1. First response Interceptor calls
    if (response && response.redirected && response.url) {
      window.location.href = response.url;
      return Promise.resolve({
        data: null,
        status: response.status,
        statusText: response.statusText,
        url: response.url,
      });
    } else {
      return this.parseJSON(response).then(responseJSON => {
        // 3. check the status.
        return this.checkStatus(responseJSON);
      });
    }
  };

  onErrorInterceptors = err => {
    let error = err.response ? err.response : { data: null, statusText: "", config: null };
    //console.log(err)
    //let history = useHistory();

    let setErrorMessage = function (msg = "Something Went wrong!!") {
      error.data = {
        msgDesc: error.statusText || msg,
      };
    };
    if (error && error.status === 401) {
      //let { url, ...rest } = opt;

      setErrorMessage("Authentication failed !!");
      //history.push()
      store.dispatch(setIsAuth(false));
      //console.log(this.props);
      //window.history.replaceState("http://localhost:3000", "Autovista - Chatbot", "/#/login");

      //window.history.replaceState("/login");

      //this.props.history.push("/login");
      //return <Redirect  to="/login" />
    } else if (error && error.status === 403) {
      setErrorMessage("Sorry, you don't have permission to perform this operation");
    } else if (error && error.status === 504) {
      setErrorMessage("Please check your internet connection");
    } else {
      setErrorMessage();
    }
    if (error.config && error.config.errorNotify !== false) {
      store.dispatch(showMessage({ message: error.data.msgDesc, variant: "error" }));
    }
    return Promise.reject(error);
  };

  beforeCallInterceptors = (config = {}) => {
    let url = "";
    if (config && config.cUrl) {
      if (config.skipApiUrl) {
        url = config.cUrl;
      } else {
        url = this.getApiUrl(config.cUrl, config.pathParam);
      }
    } else if (_.isString(config)) {
      url = config;
    }
    const csrf = Cookie.get("csrftoken");
    var defaultHeaders = {
      "X-CSRFToken": csrf,
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    };
    if (config && _.isObject(config)) {
      if (config.data && typeof config.data === "object") {
        if (config.method.toLowerCase() === "post" || config.method.toLowerCase() === "put") {
          defaultHeaders["Content-Type"] = "application/json";
          if (config.formData) {
            // if we delete/unset the content-type header, Expecting the plugin to add the content-type on its own
            defaultHeaders["Content-Type"] = "multipart/form-data";
            var form = new FormData();
            if (config.data && config.data.paramName) {
              let file = config.data.fileObj;
              //form.append(config.data.paramName, new Blob([file.name], { type: file.mimeType }), file.name);
              form.append(config.data.paramName, file, file.name);
              config.data = form;
            }
          }
        }
      }
      if (config.dateCache !== false) {
        const t = new Date().getTime();
        if (config.queryParam) {
          _.extend(config.queryParam, { t });
        } else {
          config.queryParam = { t };
        }
      }

      if (querystring && config.queryParam) {
        url = url + "?" + querystring.stringify(config.queryParam);
      }
      if (!config.replaceHeaders) {
        config.headers = Object.assign(defaultHeaders, config.headers);
      }
      Object.assign(config, { withCredentials: false });
    }
    return { ...config, url };
  };

  getApiUrl(url, pathParam) {
    let urlString = url.split(".").reduce(function (prev, curr) {
      return prev ? prev[curr] : null;
    }, ApiUrl);
    if (pathParam) {
      _.keys(pathParam).forEach(key => {
        urlString = _.replace(urlString, ":" + key, pathParam[key]);
      });
    }
    return urlString;
  }

  getBaseUrl() {
    return Constants.baseUrl;
  }

  getApiBaseUrl() {
    return Constants.baseUrl.api;
  }
}
