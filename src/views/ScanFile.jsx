import React from "react";
import { connect } from "react-redux";

import Iframe from "react-iframe";
import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

import { Actions } from "action";

const ScanFile = () => {
  const getTableCols = () => [
    {
      Header: "No",
      accessor: "no",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Date",
      accessor: "createAt",
    },
    {
      Header: "Manager",
      accessor: "manager",
    },
  ];

  const getTableData = () => [
    {
      no: 1,
      name: "20200901_state_treatment_data",
      createAt: "20200914",
      manager: "GS/Steve",
    },
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Scan</CardTitle>
              </CardHeader>
              <CardBody>
                <Iframe
                  display="initial"
                  url="http://www.youtube.com/embed/xDMP3i36naA"
                  width="100%"
                  height="662px"
                />
              </CardBody>
              <CardFooter>
                &nbsp;
              </CardFooter>
            </Card>
          </Col>
          <Col md="6">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Scan List</CardTitle>
              </CardHeader>
              <CardBody>
                <ReactTable
                  className="-striped -highlight primary-pagination"
                  columns={getTableCols()}
                  data={getTableData()}
                  defaultPageSize={10}
                  filterable={false}
                  getTrProps={(state, rowInfo, column) => {
                    return {
                      onClick: (event) => {
                        // history.push(
                        //   `/admin/project/${rowInfo.row._original.id}`
                        // );
                      },
                    };
                  }}
                  noDataText="No Projects"
                  resizable={false}
                  showPaginationTop={false}
                  showPaginationBottom
                />
              </CardBody>
              <CardFooter>
                &nbsp;
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  state,
});

const mapDispatchToProps = (dispatch) => ({
  getData: () => dispatch(Actions.getData()),
});

export default ScanFile;
