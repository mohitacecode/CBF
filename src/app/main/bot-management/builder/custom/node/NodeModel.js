import { NodeModel } from "@projectstorm/react-diagrams";

import { LinkPortModel } from "../link";

import _ from "@lodash";

/**
 * Example of a custom model using pure javascript
 */
export default class CustomNodeModel extends NodeModel {
  constructor(opt = {}) {
    let options = _.cloneDeep(opt);
    super({
      ...options,
      type: "js-custom-node",
    });
    this.__portMap = {};
    if (options.portOpt) {
      options.portOpt.forEach(obj => {
        this.__setPort(obj);
      });
    }
  }

  getPort(name) {
    let port = this.ports[name];
    if (port === undefined) {
      this.addPort(new LinkPortModel(this.__getPortIn(name), name));
    }
    return this.ports[name];
  }

  __getPortIn(name) {
    if (this.__portMap[name]) {
      return this.__portMap[name].in;
    } else {
      return true;
    }
  }

  __getPorts() {
    return this.__portMap;
  }

  __setPort(obj) {
    this.__portMap[obj.name] = obj;
  }

  __removePort(port = {}) {
    let name = port.name || port;
    if (name && this.__portMap[name]) {
      delete this.__portMap[name];
      this.removePort(this.getPort(name));
    }
  }

  serialize() {
    let internalObj = { ...super.serialize() };
    internalObj.ports.forEach(obj => {
      let found = this.options.portOpt.find(optObj => optObj.name === obj.name);
      if (found && found.componentProps) {
        obj["text"] = found.componentProps.text;
      }
    });
    return {
      ...internalObj,
      nodeData: this.options,
    };
  }

  deserialize(ob, engine) {
    super.deserialize(ob, engine);
  }
}
