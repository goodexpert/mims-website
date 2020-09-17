import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

import { Actions } from "action";
import {
  isAuthenticated,
  getNextLocation,
} from "utils";

const initFormState = {
  email: "",
  emailState: "",

  password: "",
  passwordState: "",
};

const Login = ({
  location,
  authenticate,
  login,
}) => {
  const [formState, setFormState] = React.useState(initFormState);
  const {
    emailState,
    passwordState,
  } = formState;

  // function that returns true if value is email, false otherwise
  const verifyEmail = (value) => {
    const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRex.test(value)) {
      return true;
    }
    return false;
  };
  // function that verifies if a string has a given length or not
  const verifyLength = (value, length) => {
    if (value.length >= length) {
      return true;
    }
    return false;
  };
  // function that verifies if two strings are equal
  const compare = (string1, string2) => {
    if (string1 === string2) {
      return true;
    }
    return false;
  };

  const change = (event, stateName, type, stateNameEqualTo, maxValue) => {
    let newState = formState;

    switch (type) {
      case "email":
        if (verifyEmail(event.target.value)) {
          newState = { ...newState, [`${stateName}State`]: "has-success" };
        } else {
          newState = { ...newState, [`${stateName}State`]: "has-danger" };
        }
        break;
      case "password":
        if (verifyLength(event.target.value, 1)) {
          newState = { ...newState, [`${stateName}State`]: "has-success" };
        } else {
          newState = { ...newState, [`${stateName}State`]: "has-danger" };
        }
        break;
      case "equalTo":
        if (compare(event.target.value, formState[stateNameEqualTo])) {
          newState = { ...newState, [`${stateName}State`]: "has-success" };
          newState = { ...newState, [`${stateNameEqualTo}State`]: "has-success" };
        } else {
          newState = { ...newState, [`${stateName}State`]: "has-danger" };
          newState = { ...newState, [`${stateNameEqualTo}State`]: "has-danger" };
        }
        break;
      case "length":
        if (verifyLength(event.target.value, stateNameEqualTo)) {
          newState = { ...newState, [`${stateName}State`]: "has-success" };
        } else {
          newState = { ...newState, [`${stateName}State`]: "has-danger" };
        }
        break;
      default:
        break;
    }
    setFormState({ ...newState, [stateName]: event.target.value });
  };

  const loginClick = () => {
    const { email, password } = formState;

    login(email, password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  if (isAuthenticated(authenticate)) {
    return <Redirect from="*" to={getNextLocation(location)} />;
  }
  return (
    <div className="register-page">
      <Container>
        <Row>
          <Col className="ml-auto mr-auto" lg="6" md="6">
            <Form className="form-horizontal" id="TypeValidation">
              <Card>
                <CardHeader className="text-center">
                  <CardTitle tag="h4">MIMS</CardTitle>
                  <p>Medical Information Management System</p>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Label sm="3">Email</Label>
                    <Col sm="8">
                      <FormGroup className={emailState}>
                        <Input
                          type="email"
                          name="email"
                          onChange={(e) => change(e, "email", "email")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label sm="3">Password</Label>
                    <Col sm="8">
                      <FormGroup className={passwordState}>
                        <Input
                          type="password"
                          name="password"
                          id="password"
                          autoComplete="off"
                          onChange={(e) => change(e, "password", "password")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label sm="3">&nbsp;</Label>
                    <Col sm="8">
                      <FormGroup check>
                        <Label check>
                          <Input
                            defaultValue=""
                            type="checkbox"
                          />
                          <span className="form-check-sign" />
                          Remember me
                        </Label>
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Button color="primary" onClick={loginClick}>
                    Login
                  </Button>
                  &nbsp;
                  <Button color="danger" onClick={loginClick}>
                    Sign Up
                  </Button>
                </CardFooter>
              </Card>
            </Form>
          </Col>
        </Row>
      </Container>
      <div
        className="full-page-background"
        style={{
          backgroundImage: `url(${require("assets/img/bg/jan-sendereks.jpg")})`,
        }}
      />
    </div>
  );
};

Login.propTypes = {
  location: PropTypes.any.isRequired,
  authenticate: PropTypes.any.isRequired,
  login: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = (dispatch) => ({
  login: (email, password) => dispatch(Actions.login(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
