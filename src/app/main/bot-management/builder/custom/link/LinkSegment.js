import React, { Component } from "react";

export default class DefaultLinkSegmentWidget extends Component {
  constructor(props: Object) {
    super(props);
  }

  render() {
    let Bottom = React.cloneElement(
      this.props.factory.generateLinkSegment(
        this.props.link,
        this.props.selected || this.props.link.isSelected(),
        this.props.path
      ),
      {
        ref: this.props.forwardRef,
      }
    );

    const BottomWithMarker = React.cloneElement(Bottom, { stroke: "url(#pathGrad)" });

    const Top = React.cloneElement(Bottom, {
      strokeLinecap: "round",
      onMouseLeave: () => {
        this.props.onSelection(false);
      },
      onMouseEnter: () => {
        this.props.onSelection(true);
      },
      ref: null,
      "data-linkid": this.props.link.getID(),
      strokeOpacity: this.props.selected ? 0.1 : 0,
      strokeWidth: 20,
      fill: "none",
      onContextMenu: event => {
        if (!this.props.link.isLocked()) {
          event.preventDefault();
          this.props.link.remove();
        }
      },
    });
    return (
      <g>
        {Bottom}
        {Top}
      </g>
    );
  }
}
