import createEngine, { DiagramModel, DefaultDiagramState } from "@projectstorm/react-diagrams";

import { NodeFactory, NodeModel } from "./custom/node";
import { LinkFactory } from "./custom/link";

import { InitTrayConfig } from "./custom/node/components";

const TRAY_NODE = "tray-node";

/**
 * @author Dylan Vorster
 */
class Application {
  constructor() {
    // create an instance of the engine
    this.diagramEngine = createEngine();

    // register the two engines
    this.diagramEngine.getNodeFactories().registerFactory(new NodeFactory());
    this.diagramEngine.getLinkFactories().registerFactory(new LinkFactory());

    const state = this.diagramEngine.getStateMachine().getCurrentState();
    if (state instanceof DefaultDiagramState) {
      state.dragNewLink.config.allowLooseLinks = false;
    }
    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
    // create a diagram model
    this.initModel();
    // Use this custom "AdvancedLinkFactory"

    //const ActionEventBus = this.diagramEngine.getActionEventBus();
  }

  clearModel() {
    this.activeModel = new DiagramModel();
    this.diagramEngine.setModel(this.activeModel);
  }

  updateModelUsingJSON(data) {
    if (data !== null) {
      this.activeModel.deserializeModel(data, this.diagramEngine);
      this.diagramEngine.setModel(this.activeModel);
      //this.diagramEngine.repaintCanvas();
    } else {
      this.initModel();
    }
  }

  initModel() {
    this.getNodeModel({
      ...InitTrayConfig,
      addToModel: true,
      position: {
        x: 100,
        y: 100,
      },
    });
    // let nodeObjTo = this.getNodeModel({
    // 	name: "Node 2",
    // 	color: "rgb(192,255,0)",
    // 	type: "in",
    // 	addToModel: true,
    // 	position: {
    // 		x: 400,
    // 		y: 100,
    // 	},
    // });
    // let nodeObj1From = this.getNodeModel({
    // 	name: "Node 2",
    // 	color: "rgb(192,255,0)",
    // 	type: "in",
    // 	addToModel: true,
    // 	position: {
    // 		x: 100,
    // 		y: 300,
    // 	},
    // });
    // let nodeObj1To = this.getNodeModel({
    // 	name: "Node 1",
    // 	color: "rgb(0,192,255)",
    // 	type: "out",
    // 	addToModel: true,
    // 	position: {
    // 		x: 400,
    // 		y: 400,
    // 	},
    // });
    // this.linkNodes(nodeObj1To, nodeObj1From);
    // this.linkNodes(nodeObjFrom, nodeObjTo);
  }

  getNodeModel({ position, addToModel, ...rest } = {}) {
    let node = new NodeModel({ ...rest });

    if (position) {
      node.setPosition(position);
    }

    if (addToModel) {
      this.activeModel.addNode(node);
    }

    return { node };
  }

  deleteNode(node, linkLayer) {
    const nodeId = node.options.id;
    this.activeModel.removeNode(node);
    Object.entries(linkLayer).forEach(link => {
      const targetId = link[1].targetPort.parent.options.id;
      const sourceId = link[1].sourcePort.parent.options.id;
      if (targetId === nodeId || sourceId === nodeId) this.activeModel.removeLink(link[1]);
    });
    this.diagramEngine.repaintCanvas();
  }

  linkNodes(fromNode, toNode) {
    let link1 = fromNode.port.outPort.link(toNode.port.inPort);
    this.activeModel.addLink(link1);
  }

  getActiveDiagram() {
    return this.activeModel;
  }

  getDiagramEngine() {
    return this.diagramEngine;
  }

  getTrayNode(event) {
    return JSON.parse(event.dataTransfer.getData(TRAY_NODE));
  }

  setTrayNode(event, model) {
    event.dataTransfer.setData(TRAY_NODE, JSON.stringify(model));
  }
}

export default new Application();
