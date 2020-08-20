import _ from "@lodash";

const LocalStorageHelper = {
  setOrigin: function (origin) {
    this.origin = origin;
  },
  send: function (data) {
    window.parent.postMessage({ ...data, type: "LOCALSTORE_IFRAM" }, this.origin);
  },
  remove: function (key) {
    if (this.origin) {
      this.send({ key, action: "remove" });
    } else {
      localStorage.removeItem(key);
    }
  },
  get: function (key, cb) {
    if (this.origin) {
      window.addEventListener("message", receiveMessage);
      this.send({ key, action: "get", origin: this.origin });
      function receiveMessage(event) {
        window.removeEventListener("message", receiveMessage);
        if (event.data.type === "GET_LOCALDATA") {
          cb(event.data[key]);
          // if (event.data.key) {
          // 	let data = localStorage.getItem(event.data.key);
          // 	if (data) {
          // 		cb(_.isStringJSON(data) ? JSON.parse(data) : data)
          // 	} else {
          // 		cb(data)
          // 	}
          // }
        }
      }
    } else {
      if (key) {
        let data = localStorage.getItem(key);
        if (data) {
          cb(_.isStringJSON(data) ? JSON.parse(data) : data);
        } else {
          cb(data);
        }
      }
    }
  },
  set: function ({ key, val, replace, merge, specificKey }) {
    if (_.isObject(val)) {
      if (!replace && !merge) {
        let storeData = this.get(key) || {};
        if (specificKey && storeData[specificKey] && val[specificKey]) {
          val = _.extend({}, storeData, val[specificKey]);
        } else {
          val = _.extend({}, storeData, val);
        }
      } else if (merge) {
        let storeData = this.get(key);
        val = _.merge(storeData, val);
      }
      val = JSON.stringify(val);
    }
    if (this.origin) {
      this.send({ key, val, action: "set" });
    } else {
      localStorage.setItem(key, val);
    }
  },
  replace: function (options) {
    this.set(_.extend(options, { replace: true }));
  },
  has: function (key) {
    return this.get(key) ? true : false;
  },
};
export default LocalStorageHelper;
