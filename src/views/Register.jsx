import React from "react";
import { connect } from "react-redux";

import Select from "react-select";
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
  firstName: "",
  firstNameState: "",

  lastName: "",
  lastNameState: "",

  departmentCode: "",
  departmentCodeState: "",

  email: "",
  emailState: "",

  password: "",
  passwordState: "",

  confirmPassword: "",
  confirmPasswordState: "",
};

const Register = ({
  history,
  location,
  authenticate,
  signup,
}) => {
  const [formState, setFormState] = React.useState(initFormState);
  const {
    firstNameState,
    lastNameState,
    departmentCodeState,
    emailState,
    passwordState,
    confirmPasswordState,
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
  // function that verifies if value contains only numbers
  const verifyNumber = (value) => {
    const numberRex = new RegExp("^[0-9]+$");
    if (numberRex.test(value)) {
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
      case "select":
        setFormState({ ...newState, [stateName]: event.value });
        return;
      default:
        return;
    }
    setFormState({ ...newState, [stateName]: event.target.value });
  };

  const submitClick = () => {
    const { firstName, lastName, email, password, departmentCode } = formState;

    signup({ firstName, lastName, email, password, departmentCode })
      .then((res) => {
        history.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                    <Label sm="3">First Name</Label>
                    <Col sm="8">
                      <FormGroup className={firstNameState}>
                        <Input
                          type="text"
                          name="firstName"
                          onChange={(e) => change(e, "firstName", "length", 1)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label sm="3">Last Name</Label>
                    <Col sm="8">
                      <FormGroup className={lastNameState}>
                        <Input
                          type="text"
                          name="lastName"
                          onChange={(e) => change(e, "lastName", "length", 1)}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    <Label sm="3">Department</Label>
                    <Col sm="8">
                      <FormGroup className={departmentCodeState}>
                        <Select
                          className="react-select"
                          classNamePrefix="react-select"
                          name="departmentCode"
                          placeholder=""
                          options={[
                            {
                              value: "001",
                              label: "일반의",
                            },
                          ]}
                          onChange={(e) => change(e, "departmentCode", "select")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
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
                    <Label sm="3">Confirm Password</Label>
                    <Col sm="8">
                      <FormGroup className={confirmPasswordState}>
                        <Input
                          type="password"
                          name="confirmPassword"
                          id="confirmPassword"
                          equalto="#password"
                          autoComplete="off"
                          onChange={(e) => change(e, "confirmPassword", "equalTo", "password")}
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter className="text-center">
                  <Button color="danger">
                    Cancel
                  </Button>
                  &nbsp;
                  <Button color="primary" onClick={submitClick}>
                    Submit
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
          backgroundImage: `url(${require("assets/img/bg/jan-sendereks.jpg")})`
        }}
      />
    </div>
  );
};

Register.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  authenticate: PropTypes.any.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (data) => dispatch(Actions.signup(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Register);
