import * as React from "react";
import LinkWidget from "./LinkWidget";
import LinkModel from "./LinkModel";
import { DefaultLinkFactory } from "@projectstorm/react-diagrams";

export default class CustomLinkFactory extends DefaultLinkFactory {
  constructor() {
    super("advanced");
  }

  generateModel() {
    return new LinkModel();
  }

  generateReactWidget(event) {
    return <LinkWidget link={event.model} diagramEngine={this.engine} />;
  }
}
