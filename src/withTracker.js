import React, { Component } from "react";
import ReactGA from "react-ga";

export const trackPage = (page, options = {}) => {
  console.log("tes");
  ReactGA.set({
    page,
    ...options,
  });
  ReactGA.pageview(page);
};

export default function withTracker(WrappedComponent, options = {}) {
  const HOC = class extends Component {
    componentDidMount() {
      const {
        location: { pathname: page },
      } = this.props;
      trackPage(page);
    }

    // eslint-disable-next-line camelcase
    UNSAFE_componentWillReceiveProps(nextProps) {
      const {
        location: { pathname: currentPage },
      } = this.props;
      const nextPage = nextProps.location.pathname;

      if (currentPage !== nextPage) {
        trackPage(nextPage);
      }
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };

  return HOC;
}
