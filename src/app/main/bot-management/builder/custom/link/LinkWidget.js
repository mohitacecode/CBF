import React from "react";
import { DefaultLinkWidget } from "@projectstorm/react-diagrams";
//import { LinkWidget } from "@projectstorm/react-diagrams-core";

//import LinkSegment from "./LinkSegment";

const CustomLinkArrowWidget = props => {
  const { point, previousPoint } = props;

  const angle =
    90 +
    (Math.atan2(
      point.getPosition().y - previousPoint.getPosition().y,
      point.getPosition().x - previousPoint.getPosition().x
    ) *
      180) /
      Math.PI;

  //translate(50, -10),
  return (
    <g
      className="arrow"
      transform={"translate(" + point.getPosition().x + ", " + point.getPosition().y + ")"}
    >
      <g style={{ transform: "rotate(" + angle + "deg)" }}>
        <g transform={"translate(0, -3)"}>
          <polygon
            points="0,10 8,30 -8,30"
            fill={props.color}
            onMouseLeave={() => {
              this.setState({ selected: false });
            }}
            onMouseEnter={() => {
              this.setState({ selected: true });
            }}
            data-id={point.getID()}
            data-linkid={point.getLink().getID()}
          ></polygon>
        </g>
      </g>
    </g>
  );
};

export default class CustomLinkWidget extends DefaultLinkWidget {
  generateArrow(point, previousPoint) {
    return (
      <CustomLinkArrowWidget
        key={point.getID()}
        point={point}
        previousPoint={previousPoint}
        colorSelected={this.props.link.getOptions().selectedColor}
        color={this.props.link.getOptions().color}
      />
    );
  }

  createLinkPoint(event, j) {
    setTimeout(() => {
      console.log(this.props.diagramEngine.eventBus.keys);
      let customKey = (this.props.customKeys && this.props.customKeys.addPoint) || "z";
      if (this.props.diagramEngine.eventBus.keys[customKey]) {
        this.addPointToLink(event, j + 1);
      }
    }, 30);
  }

  getDirection(source, target) {
    const difX = source.x - target.x,
      difY = source.y - target.y,
      isHorisontal = Math.abs(difX) > Math.abs(difY);

    return isHorisontal ? difX > 0 : difY > 0;
  }

  // generateLink(path, extraProps, id) {
  // 	const ref = React.createRef();
  // 	this.refPaths.push(ref);
  // 	return (
  // 		<LinkSegment
  // 			key={`link-${id}`}
  // 			path={path}
  // 			selected={this.state.selected}
  // 			diagramEngine={this.props.diagramEngine}
  // 			factory={this.props.diagramEngine.getFactoryForLink(this.props.link)}
  // 			link={this.props.link}
  // 			forwardRef={ref}
  // 			onSelection={(selected) => {
  // 				this.setState({ selected: selected });
  // 			}}
  // 		/>
  // 	);
  // }

  // render() {
  // 	//ensure id is present for all points on the path
  // 	var points = this.props.link.getPoints();
  // 	var paths = [];
  // 	this.refPaths = [];

  // 	//draw the multiple anchors and complex line instead
  // 	for (let j = 0; j < points.length - 1; j++) {
  // 		paths.push(
  // 			this.generateLink(
  // 				LinkWidget.generateLinePath(points[j], points[j + 1]),
  // 				{
  // 					"data-linkid": this.props.link.getID(),
  // 					"data-point": j,
  // 					onMouseDown: (event) => {
  // 						event.persist();
  // 						this.createLinkPoint(event, j);
  // 					},
  // 				},
  // 				j
  // 			)
  // 		);
  // 	}

  // 	//render the circles
  // 	for (let i = 1; i < points.length - 1; i++) {
  // 		paths.push(this.generatePoint(points[i]));
  // 	}

  // 	if (this.props.link.getTargetPort() !== null) {
  // 		paths.push(this.generateArrow(points[points.length - 1], points[points.length - 2]));
  // 	} else {
  // 		paths.push(this.generatePoint(points[points.length - 1]));
  // 	}

  // 	return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
  // }
  //
  // render() {
  // 	//ensure id is present for all points on the path
  // 	var points = this.props.link.getPoints(),
  // 		paths = [],
  // 		inversed = false;
  // 	this.refPaths = [];
  // 	// if (this.props.link.sourcePort && this.props.link.targetPort) {
  // 	// 	inversed = this.getDirection(this.props.link.sourcePort.position, this.props.link.targetPort.position);
  // 	// }

  // 	if (points.length === 2) {
  // 		paths.push(
  // 			this.generateLink(
  // 				this.props.link.getSVGPath({ inversed }),
  // 				{
  // 					onMouseDown: (event) => {
  // 						this.addPointToLink(event, 1);
  // 					},
  // 					inversed,
  // 				},
  // 				"0"
  // 			)
  // 		);

  // 		// draw the link as dangeling
  // 		if (this.props.link.getTargetPort() == null) {
  // 			paths.push(this.generatePoint(points[1]));
  // 		}
  // 	} else {
  // 		//draw the multiple anchors and complex line instead
  // 		for (let j = 0; j < points.length - 1; j++) {
  // 			paths.push(
  // 				this.generateLink(
  // 					LinkWidget.generateLinePath(points[j], points[j + 1]),
  // 					{
  // 						"data-linkid": this.props.link.getID(),
  // 						"data-point": j,
  // 						onMouseDown: (event: MouseEvent) => {
  // 							this.addPointToLink(event, j + 1);
  // 						},
  // 					},
  // 					j
  // 				)
  // 			);
  // 		}

  // 		//render the circles
  // 		for (let i = 1; i < points.length - 1; i++) {
  // 			paths.push(this.generatePoint(points[i]));
  // 		}

  // 		if (this.props.link.getTargetPort() == null) {
  // 			paths.push(this.generatePoint(points[points.length - 1]));
  // 		}
  // 	}

  // 	return <g data-default-link-test={this.props.link.getOptions().testName}>{paths}</g>;
  // }
}
