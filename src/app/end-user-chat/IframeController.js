export default {
  setOrigin: function (url) {
    this.origin = url;
  },
  send: function (data) {
    console.log(this.origin);
    console.log(data);
    window.parent.postMessage({ values: data, type: "UPDATE_IFRAM" }, this.origin);
  },
  show: function () {
    this.send(["display", "block"]);
  },
  hide: function () {
    this.send(["display", "none"]);
  },
  setLeft: function (left) {
    if (left) {
      this.send(["left", left]);
    }
  },
  setRight: function (right) {
    if (right) {
      this.send(["right", right]);
    }
  },
  setHeight: function (height) {
    if (height) {
      this.send(["height", height]);
    }
  },
  setWidth: function (width) {
    if (width) {
      this.send(["width", width]);
    }
  },
};
