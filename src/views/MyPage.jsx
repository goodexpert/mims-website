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
  Form,
  FormGroup,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
  Row,
} from "reactstrap";
import PropTypes from "prop-types";

import { Actions } from "action";
import defaultImage from "assets/img/default-avatar.png";

const initFormState = {
  firstName: "",
  firstNameState: "",

  lastName: "",
  lastNameState: "",

  email: "",
  emailState: "",
};

const MyPage = ({
  history,
  location,
  authenticate,
  updateProfile,
}) => {
  const [formState, setFormState] = React.useState(initFormState);
  const {
    firstNameState,
    lastNameState,
    emailState,
  } = formState;
  const { token } = authenticate;
  const [firstName, setFirstName] = React.useState(token.firstName);
  const [lastName, setLastName] = React.useState(token.lastName);
  const [email, setEmail] = React.useState(token.email);
  const [departmentCode, setDepartmentCode] = React.useState(token.departmentCode.code);

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
      default:
        break;
    }
    setFormState({ ...newState, [stateName]: event.target.value });
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">My Page</CardTitle>
              </CardHeader>
              <CardBody>
                <Form className="form-horizontal" id="TypeValidation">
                  <Row>
                    <Col md="4">
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <div className="thumbnail" style={{ maxWidth: "100%" }}>
                          <img src={defaultImage} alt="..." />
                        </div>
                      </div>
                    </Col>
                    <Col md="8">
                      <Row>
                        <Label sm="3">First Name</Label>
                        <Col sm="8">
                          <FormGroup className={firstNameState}>
                            <Input
                              type="text"
                              name="firstName"
                              value={firstName}
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
                              value={lastName}
                              onChange={(e) => change(e, "lastName", "length", 1)}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Label sm="3">Department</Label>
                        <Col sm="8">
                          <FormGroup>
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
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Label sm="3">Email</Label>
                        <Col sm="8">
                          <FormGroup className={emailState}>
                            <InputGroup>
                              <Input
                                type="email"
                                name="email"
                                value={email}
                                onChange={(e) => change(e, "email", "email")}
                              />
                              <InputGroupAddon addonType="append">
                                <button style={{ borderTopRightRadius: "4px", borderBottomRightRadius: "4px" }}>
                                  Check
                                </button>
                              </InputGroupAddon>
                            </InputGroup>
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Form>
              </CardBody>
              <CardFooter>
                <Row style={{ justifyContent: "center" }}>
                  <Button color="danger">
                    Cancel
                  </Button>
                  &nbsp;
                  <Button color="primary">
                    Update
                  </Button>
                </Row>
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

MyPage.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  authenticate: PropTypes.any.isRequired,
  updateProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = (dispatch) => ({
  updateProfile: (formData) => dispatch(Actions.updateProfile(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MyPage);
