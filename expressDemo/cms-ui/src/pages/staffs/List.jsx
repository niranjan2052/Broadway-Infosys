import { useEffect, useState } from "react";
import { Col, Row, Table } from "react-bootstrap";
import { Loading } from "@/components";
import http from "@/http";
import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import { Link } from "react-router-dom";

dayjs.extend(localizedFormat);

export const List = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadStaffs();
  }, []);

  const loadStaffs = () => {
    http
      .get("cms/staffs")
      .then(({ data }) => setStaffs(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  return (
    <Col className="bg-white py-2 my-2 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Staffs</h1>
        </Col>
        <Col xs="auto">
          <Link to="/staffs/create" className="btn btn-dark">
            <i className="fa-solid fa-plus me-2"></i>
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            {staffs.length > 0 ? (
              <Table size="sm" striped hover bordered>
                <thead className="table-dark">
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Address</th>
                    <th>Status</th>
                    <th>Created At</th>
                    <th>Updated At</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {staffs.map((staff) => (
                    <tr key={staff._id}>
                      <td>{staff.name}</td>
                      <td>{staff.email}</td>
                      <td>{staff.phone}</td>
                      <td>{staff.address}</td>
                      <td>{staff.status ? "Active" : "Inactive"}</td>
                      <td>{dayjs(staff.createdAt).format("lll")}</td>
                      <td>{dayjs(staff.updatedAt).format("lll")}</td>
                      <td></td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <h4 className="text-muted">No Data Found!!</h4>
            )}
          </Col>
        </Row>
      )}
    </Col>
  );
};
