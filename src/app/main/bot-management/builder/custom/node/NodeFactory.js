import * as React from "react";
import NodeModel from "./NodeModel";
import NodeWidget from "./NodeWidget";
import { AbstractReactFactory } from "@projectstorm/react-canvas-core";

export default class CustomNodeFactory extends AbstractReactFactory {
  constructor() {
    super("js-custom-node");
  }

  generateModel({ initialConfig } = {}) {
    if (initialConfig && initialConfig.nodeData) {
      return new NodeModel({ ...initialConfig.nodeData });
    } else {
      return new NodeModel();
    }
  }

  generateReactWidget(event) {
    return <NodeWidget engine={this.engine} node={event.model} />;
  }
}
