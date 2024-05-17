import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { DataTable, Loading } from "@/components";
import http from "@/http";
import { dt, imgUrl } from "@/lib";
import { confirmAlert } from "react-confirm-alert";

export const List = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);
  useEffect(() => {
    loadProducts();
  }, [products]);

  const loadProducts = () => {
    http
      .get("cms/products")
      .then(({ data }) => setProducts(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const deleteProduct = (productId) => {
    confirmAlert({
      title: "Delete Product",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/products/${productId}`)
              .then(() => {
                loadProducts();
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
          <h1>Products</h1>
        </Col>
        <Col xs="auto">
          <Link to="/products/create" className="btn btn-dark">
            <i className="fa-solid fa-plus"></i>
            <span className="mx-1">Add Product</span>
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
                "Category",
                "Brand",
                "Price",
                "Dis. Price",
                "Status",
                "Created At",
                "Updated At",
              ]}
              sortable={[
                "Name",
                "Category",
                "Brand",
                "Price",
                "Dis. Price",
                "Status",
                "Created At",
                "Updated At",
              ]}
              data={products.map((product) => {
                return {
                  Name: product.name,
                  Image: (
                    <img src={imgUrl(product.images[0])} alt={product.name} className="img-sm"/>
                  ),
                  Category: product.catagory.name,
                  Brand: product.brand.name,
                  "Dis. Price": product.discounted_price,
                  Status: product.status ? "Active" : "Inactive",
                  "Created At": dt(product.createdAt),
                  "Updated At": dt(product.updatedAt),
                  Actions: (
                    <>
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="btn btn-dark btn-sm me-2"
                      >
                        <i className="fa-solid fa-edit me-2"></i>Edit
                      </Link>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteProduct(product._id)}
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
