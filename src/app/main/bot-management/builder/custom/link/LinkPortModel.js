import LinkModel from "./LinkModel";
import { DefaultPortModel } from "@projectstorm/react-diagrams";

export default class CustomLinkPortModel extends DefaultPortModel {
  createLinkModel() {
    return new LinkModel();
  }

  canLinkToPort(port) {
    if (port instanceof DefaultPortModel) {
      if (port.getOptions().in === true && this.options.in === false) {
        return true;
      } else {
        return false;
      }
    }
    return true;
  }
}
