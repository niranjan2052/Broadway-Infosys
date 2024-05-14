import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Loading, DataTable } from "@/components";
import http from "@/http";
import { Link } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { dt } from "@/lib";

export const List = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

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
            <DataTable
              searchable={["Name", "Email", "Phone", "Address", "Status"]}
              data={staffs.map((staff) => {
                return {
                  Name: staff.name,
                  Email: staff.email,
                  Phone: staff.phone,
                  Address: staff.address,
                  Status: staff.status ? "Active" : "Inactive",
                  "Created At": dt(staff.createdAt),
                  "Updated At": dt(staff.updatedAt),
                  Actions: (
                    <>
                      <Link
                        to={`/staffs/edit/${staff._id}`}
                        className="btn btn-dark btn-sm me-2"
                      >
                        <i className="fa-solid fa-edit me-2"></i>Edit
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteStaff(staff._id)}
                      >
                        <i className="fa-solid fa-times me-2"></i>Delete
                      </Button>
                    </>
                  ),
                };
              })}
            />
          </Col>
        </Row>
      )}
    </Col>
  );
};
