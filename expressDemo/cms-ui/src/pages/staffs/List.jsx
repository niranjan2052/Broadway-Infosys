import { useEffect, useState } from "react";
import { Button, Col, Row, Table } from "react-bootstrap";
import { Loading } from "@/components";
import http from "@/http";
import { Link, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { dt } from "@/lib";

export const List = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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
  const deleteStaff = (userId) => {
    confirmAlert({
      title: "Delete Staff",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/staffs/${userId}`)
              .then(() => loadStaffs())
              .catch(() => {})
              .finally(() => setLoading(false));
          },
        },
        {
          label: "No",
          className: "bg-secondary",
          onClick: () => {},
        },
      ],
    });
  };

  return (
    <Col className="bg-white py-2 my-2 rounded-2 shadow-sm">
      <Row>
        <Col>
          <h1>Staffs</h1>
        </Col>
        <Col xs="auto">
          <Link to="/staffs/create" className="btn btn-dark">
            <i className="fa-solid fa-plus"></i>
            <span className="mx-1">Add Staff</span>
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
                      <td>{dt(staff.createdAt)}</td>
                      <td>{dt(staff.updatedAt)}</td>
                      <td>
                        <Button
                          className="btn-primary"
                          onClick={() => {
                            navigate(`/staffs/edit/${staff._id}`);
                          }}
                        >
                          <i className="fa-regular fa-pen-to-square me-1"></i>
                          Edit
                        </Button>
                        <Button
                          className="btn-danger ms-1"
                          onClick={() => deleteStaff(staff._id)}
                        >
                          <i className="fa-solid fa-trash-can me-1"></i>
                          Delete
                        </Button>
                      </td>
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
