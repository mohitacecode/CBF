import { DefaultLinkModel } from "@projectstorm/react-diagrams";
//import { BezierCurve } from "@projectstorm/geometry";

// class CustomBezierCurve extends BezierCurve {
// 	setSource(point) {
// 		this.points[BezierCurvepPoints.SOURCE] = point;
// 	}

// 	setSourceControl(point: Point) {
// 		this.points[BezierCurvepPoints.SOURCE_CONTROL] = point;
// 	}

// 	setTargetControl(point: Point) {
// 		this.points[BezierCurvepPoints.TARGET_CONTROL] = point;
// 	}

// 	setTarget(point: Point) {
// 		this.points[BezierCurvepPoints.TARGET] = point;
// 	}
// }

export default class CustomLinkModel extends DefaultLinkModel {
  constructor() {
    super({
      type: "advanced",
      width: 3,
    });
  }

  // getSVGPath() {
  // 	if (this.points.length === 2) {
  // 		const curve = new BezierCurve();
  // 		let sourcePoint = this.getFirstPoint().getPosition().clone();
  // 		curve.setSource(sourcePoint);
  // 		let targetPoint = this.getLastPoint().getPosition().clone();
  // 		curve.setTarget(targetPoint);
  // 		let sourceClone = this.getFirstPoint().getPosition().clone();
  // 		curve.setSourceControl(sourceClone);
  // 		let targetClone = this.getLastPoint().getPosition().clone();
  // 		curve.setTargetControl(targetClone);

  // 		if (this.sourcePort) {
  // 			curve.getSourceControl().translate(...this.calculateControlOffset(this.getSourcePort()));
  // 		}

  // 		if (this.targetPort) {
  // 			curve.getTargetControl().translate(...this.calculateControlOffset(this.getTargetPort()));
  // 		}
  // 		return curve.getSVGCurve();
  // 	}
  // }
}
