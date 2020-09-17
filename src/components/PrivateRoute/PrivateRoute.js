import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import PropTypes from "prop-types";

import { isAuthenticated } from "../../utils";

const PrivateRoute = ({ component: Component, authenticate, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (isAuthenticated(authenticate) ? (
      <Component {...props} />
    ) : (
      <Redirect
        to={{ pathname: "/auth/login", state: { from: props.location } }}
      />
    ))}
  />
);

PrivateRoute.propTypes = {
  authenticate: PropTypes.any.isRequired,
};

const mapStateToProps = (state) => ({
  authenticate: state.authenticate,
});

export default withRouter(connect(mapStateToProps)(PrivateRoute));
