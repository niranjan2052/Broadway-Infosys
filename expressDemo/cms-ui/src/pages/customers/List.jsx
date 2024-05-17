import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable, Loading } from "@/components";
import http from "@/http";
import { dt } from "@/lib";
import { confirmAlert } from "react-confirm-alert";

export const List = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCustomers();
  }, []);
  useEffect(() => {
    loadCustomers();
  }, [customers]);

  const loadCustomers = () => {
    http
      .get("cms/customer")
      .then(({ data }) => setCustomers(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const deleteCustomer = (userId) => {
    confirmAlert({
      title: "Delete Customer",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/customer/${userId}`)
              .then(() => {
                loadCustomers();
              })
              .catch(() => {})
              .finally(() => {
                setLoading(false);
              });
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
          <h1>Customers</h1>
        </Col>
        <Col xs="auto">
          <Link to="/customers/create" className="btn btn-dark">
            <i className="fa-solid fa-plus"></i>
            <span className="mx-1">Add Customer</span>
          </Link>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            <DataTable
              searchable={[
                "Name",
                "Email",
                "Phone",
                "Address",
                "Status",
                "Created At",
                "Updated At",
              ]}
              sortable={[
                "Name",
                "Email",
                "Phone",
                "Address",
                "Status",
                "Created At",
                "Updated At",
              ]}
              data={customers.map((customer) => {
                return {
                  Name: customer.name,
                  Email: customer.email,
                  Phone: customer.phone,
                  Address: customer.address,
                  Status: customer.status ? "Active" : "Inactive",
                  "Created At": dt(customer.createdAt),
                  "Updated At": dt(customer.updatedAt),
                  Actions: (
                    <>
                      <Link
                        to={`/customers/edit/${customer._id}`}
                        className="btn btn-dark btn-sm me-2"
                      >
                        <i className="fa-solid fa-edit me-2"></i>Edit
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCustomer(customer._id)}
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
