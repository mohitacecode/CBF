// imports
import React from "react";

// material
// import Typography from "@material-ui/core/Typography";

function SimpleMsg(props) {
  return <p className={props.class}>{props.msg}</p>;
  // return (
  // <Typography component={"span"} className={props.class.type}>
  // 	{props.msg.user}
  // </Typography>;
  // 	<Typography component={"span"} className={props.class.msg}>
  // 		{props.msg.text}
  // 		<Typography component={"span"} className={props.class.time}>
  // 			{props.msg.time}
  // 		</Typography>
  // 	</Typography>
  // );
}

export default SimpleMsg;
