import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable, Loading } from "@/components";
import http from "@/http";
import { dt } from "@/lib";
import { confirmAlert } from "react-confirm-alert";

export const List = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBrands();
  }, []);

  const loadBrands = () => {
    http
      .get("cms/brand")
      .then(({ data }) => setBrands(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const deleteBrand = (userId) => {
    confirmAlert({
      title: "Delete Brand",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/brand/${userId}`)
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
          <h1>Brands</h1>
        </Col>
        <Col xs="auto">
          <Link to="/brands/create" className="btn btn-dark">
            <i className="fa-solid fa-plus"></i>
            <span className="mx-1">Add Brands</span>
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
              data={brands.map((brand) => {
                return {
                  Name: brand.name,
                  Status: brand.status ? "Active" : "Inactive",
                  "Created At": dt(brand.createdAt),
                  "Updated At": dt(brand.updatedAt),
                  Actions: (
                    <>
                      <Link
                        to={`/brands/edit/${brand._id}`}
                        className="btn btn-dark btn-sm me-2"
                      >
                        <i className="fa-solid fa-edit me-2"></i>Edit
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteBrand(brand._id)}
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
