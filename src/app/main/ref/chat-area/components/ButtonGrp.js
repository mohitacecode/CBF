// imports
import React from "react";

// material
import Button from "@material-ui/core/Button";

// components
import ButtonGroup from "@material-ui/core/ButtonGroup";

function ButtonGrp(props) {
  const click = e => {
    console.log(e.target.innerText);
    //props.socket.socket.emit("message", {data: e.target.innerText, targetId: props.targetId , room: props.socket.room});
  };

  const Btn = () => {
    if (props.text.length === 1) {
      return (
        <Button variant="contained" color="primary" onClick={click}>
          {`Demo Button for nodeType "Multiple" with single text from response == ""${props.text[0]}"" `}
        </Button>
      );
    } else if (props.text.length > 1) {
      return (
        <ButtonGroup
          variant="contained"
          color="secondary"
          aria-label="contained primary button group"
          orientation={props.orientation}
        >
          {props.text.map(text => {
            return (
              <Button variant="contained" color="primary" onClick={click}>
                {text}
              </Button>
            );
          })}
        </ButtonGroup>
      );
    }
  };

  return <Btn />;
}

export default ButtonGrp;
