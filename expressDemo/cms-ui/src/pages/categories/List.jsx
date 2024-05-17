import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable, Loading } from "@/components";
import http from "@/http";
import { dt } from "@/lib";
import { confirmAlert } from "react-confirm-alert";

export const List = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = () => {
    http
      .get("cms/catagory")
      .then(({ data }) => setCategories(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const deleteCategory = (userId) => {
    confirmAlert({
      title: "Delete Category",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/catagory/${userId}`)
              .then(() => {
                loadBrands();
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
          <h1>Categories</h1>
        </Col>
        <Col xs="auto">
          <Link to="/categories/create" className="btn btn-dark">
            <i className="fa-solid fa-plus"></i>
            <span className="mx-1">Add Categories</span>
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
                "Status",
                "Created At",
                "Updated At",
              ]}
              sortable={[
                "Name",
                "Status",
                "Created At",
                "Updated At",
              ]}
              data={categories.map((category) => {
                return {
                  Name: category.name,
                  Status: category.status ? "Active" : "Inactive",
                  "Created At": dt(category.createdAt),
                  "Updated At": dt(category.updatedAt),
                  Actions: (
                    <>
                      <Link
                        to={`/categories/edit/${category._id}`}
                        className="btn btn-dark btn-sm me-2"
                      >
                        <i className="fa-solid fa-edit me-2"></i>Edit
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteCategory(category._id)}
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
