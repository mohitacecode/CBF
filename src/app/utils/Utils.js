import moment from "moment";
import _ from "@lodash";
import LocalStorageHelper from "./modules/LocalStorageHelper";

const msToTime = function (duration) {
  if (duration) {
    var tempTime = moment.duration(_.isObject(duration) ? 0 : duration);
    return moment.utc(tempTime.as("milliseconds")).format("HH:mm:ss");
  } else {
    return "00:00:00";
  }
};

const secondsToTime = function (duration) {
  if (duration) {
    return moment.utc(duration * 1000).format("HH:mm:ss");
  } else {
    return "00:00:00";
  }
};
export { msToTime, secondsToTime, LocalStorageHelper };
