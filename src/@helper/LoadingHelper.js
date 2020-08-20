import React, { Fragment } from "react";
import styled from "@emotion/styled";

const ParentDiv = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const OverLayDiv = styled(ParentDiv)`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: #80808030;
`;
const LoadingHelper = ({
  type = "spinner-border text-info",
  loading = true,
  children = null,
  overlay = false,
}) => {
  const Div = overlay && children ? OverLayDiv : ParentDiv;
  return loading ? (
    <Fragment>
      <Div>
        <div className={type}></div>
      </Div>
      {overlay && children ? children : null}
    </Fragment>
  ) : (
    children
  );
};

export default LoadingHelper;
