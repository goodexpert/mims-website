import React from "react";
import { connect } from "react-redux";

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
import PropTypes from "prop-types";

import { Actions } from "action";
import { isSuccessful, getNetworkError, isEmptyArray } from "utils";

const DataTable = ({
  history,
  location,
  authenticate,
  getFiles,
}) => {
  const [fileData, setFileData] = React.useState([]);
  const getTableCols = () => [
    {
      Header: "Filename",
      accessor: "fileName",
    },
    {
      Header: "Name",
      accessor: "name",
    },
    {
      Header: "Date",
      accessor: "createAt",
    },
  ];

  const getTableData = () => {
    return isEmptyArray(fileData)
      ? []
      : fileData.map((item) => {
        const name = `${item.staff.firstName} ${item.staff.lastName} `;
        return { ...item, name };
      });
  };

  const updateData = () => {
    const { token } = authenticate;

    getFiles(token._id)
      .then((res) => {
        if (!isSuccessful(res)) {
          throw getNetworkError(res);
        }
        setFileData(res.payload.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  React.useEffect(() => {
    updateData();
  }, []);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Data</CardTitle>
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

DataTable.propTypes = {
  history: PropTypes.any.isRequired,
  location: PropTypes.any.isRequired,
  authenticate: PropTypes.any.isRequired,
  getFiles: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authenticate: state.authenticate,
});

const mapDispatchToProps = (dispatch) => ({
  getFiles: (staffId) => dispatch(Actions.getFiles(staffId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DataTable);
