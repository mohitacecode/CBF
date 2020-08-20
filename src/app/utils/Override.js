import _ from "@lodash";
import moment from "moment";

if (!Date.now) {
  Date.now = function () {
    return new Date().getTime();
  };
}
if (moment) {
  moment.prototype.toNoTimeJSON = function () {
    return this.format("YYYY-MM-DDT00:00:00.000") + "Z";
  };
}

if (!FileList.prototype.map) {
  FileList.prototype.map = function (callback) {
    var T, A, k;

    if (this == null) {
      throw new TypeError("this is null or not defined");
    }

    var O = Object(this);
    var len = O.length >>> 0;

    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    if (arguments.length > 1) {
      T = arguments[1];
    }

    A = new Array(len);

    k = 0;

    while (k < len) {
      var kValue, mappedValue;
      if (k in O) {
        kValue = O[k];
        mappedValue = callback.call(T, kValue, k, O);
        A[k] = mappedValue;
      }
      k++;
    }
    return A;
  };
}

_.mixin({
  isUndefinedOrNull: function (val) {
    return _.isUndefined(val) || _.isNull(val);
  },
  toArrayIfObject: function (obj) {
    return _.isObject(obj) && !_.isArray(obj) ? [obj] : obj;
  },
  isHtml: function (str) {
    return /<[a-z/][\s\S]*>/i.test(str); // true
  },
  isStringJSON: function (str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  },
  findAndReplace: function (array, replace, callback) {
    if (array && replace) {
      if (_.isArray(replace)) {
        return replace.map(obj => {
          return this.findAndReplace(array, obj, callback);
        });
      } else {
        let index = _.findIndex(array, callback ? o => callback(o, replace) : replace);
        if (index > -1) {
          return array.splice(index, 1, replace);
        }
      }
    }
  },
  findUpdateOrCreate: function (array, replace, callback) {
    let replaced = this.findAndReplace(array, replace, callback);
    if (replaced === undefined) {
      return array.push(replace);
    }
  },
  findAndMerge: function (array, replace, callback) {
    if (array && replace) {
      if (_.isArray(replace)) {
        return replace.map(obj => {
          return this.findAndMerge(array, obj, callback);
        });
      } else {
        let index = _.findIndex(array, callback ? o => callback(o, replace) : replace);
        if (index > -1) {
          return array.splice(index, 1, _.extend(array[index], replace));
        }
      }
    }
  },
  findAndDelete: function (array, find, callback) {
    if (array && find) {
      if (_.isArray(find)) {
        return find.map(obj => {
          return this.findAndDelete(array, obj, callback);
        });
      } else {
        let index = _.findIndex(array, callback ? o => callback(o) : find);
        if (index > -1) {
          return array.splice(index, 1);
        }
      }
    }
  },
  mergeClassProperty: function (target, ...mixins) {
    mixins.forEach(mixin => {
      _.each(Object.getPrototypeOf(mixin.prototype), (prop, key) => {
        if (
          !key.match(
            /^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/
          )
        )
          Object.defineProperty(target, prop, Object.getOwnPropertyDescriptor(prop, key));
      });
    });
  },
});
