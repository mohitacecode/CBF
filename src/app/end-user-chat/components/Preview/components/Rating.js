import React, { Fragment, useState } from "react";

//material
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import SentimentVeryDissatisfiedIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import SentimentDissatisfiedIcon from "@material-ui/icons/SentimentDissatisfied";
import SentimentSatisfiedIcon from "@material-ui/icons/SentimentSatisfied";
import SentimentSatisfiedAltIcon from "@material-ui/icons/SentimentSatisfiedAltOutlined";
import SentimentVerySatisfiedIcon from "@material-ui/icons/SentimentVerySatisfied";
import Box from "@material-ui/core/Box";

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon />,
    label: "Very Dissatisfied",
  },
  2: {
    icon: <SentimentDissatisfiedIcon />,
    label: "Dissatisfied",
  },
  3: {
    icon: <SentimentSatisfiedIcon />,
    label: "Neutral",
  },
  4: {
    icon: <SentimentSatisfiedAltIcon />,
    label: "Satisfied",
  },
  5: {
    icon: <SentimentVerySatisfiedIcon />,
    label: "Very Satisfied",
  },
};

const RatingComponent = ({ node, setUserInputVal, setRating, handelChange }) => {
  const [ratingDisable, setRatingDisable] = useState(false);

  function IconContainer(props) {
    const { value, ...other } = props;
    return <span {...other}>{customIcons[value].icon}</span>;
  }

  const sendRating = e => {
    setRating(e.target.value);
    if (node.feedback_input === false) {
      handelChange(null, true, e.target.value);
    }
    setRatingDisable(true);
  };

  if (node.rating_type === "emoji") {
    return (
      <Fragment>
        <Box borderColor="transparent" component="fieldset">
          <Rating
            onChange={sendRating}
            name="customized-icons"
            defaultValue={2}
            getLabelText={value => customIcons[value].label}
            IconContainerComponent={IconContainer}
            disabled={ratingDisable}
            size="medium"
          />
        </Box>
      </Fragment>
    );
  } else if (node.rating_type === "star_custom") {
    return (
      <Fragment>
        <Box borderColor="transparent" component="fieldset">
          <Rating
            onChange={sendRating}
            name="customized-empty"
            defaultValue={3.5}
            precision={0.5}
            max={Number(node.rating_max)}
            emptyIcon={<StarBorderIcon fontSize="inherit" />}
            disabled={ratingDisable}
            size="medium"
          />
        </Box>
      </Fragment>
    );
  }
};

export default RatingComponent;
