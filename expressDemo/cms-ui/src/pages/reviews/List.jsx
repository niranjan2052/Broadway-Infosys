import { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { Loading, DataTable } from "@/components";
import http from "@/http";
import { confirmAlert } from "react-confirm-alert";
import { dt } from "@/lib";

export const List = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    http
      .get("cms/reviews")
      .then(({ data }) => setReviews(data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };
  const handleDelete = (reviewId) => {
    confirmAlert({
      title: "Delete Review",
      message: "Are you sure? You want to delete this Item?",
      buttons: [
        {
          label: "Yes",
          className: `bg-danger`,
          onClick: () => {
            http
              .delete(`cms/reviews/${reviewId}`)
              .then(() => loadReviews())
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
          <h1>Reviews</h1>
        </Col>
      </Row>
      {loading ? (
        <Loading />
      ) : (
        <Row>
          <Col>
            <DataTable
              searchable={[
                "User",
                "Product",
                "Comment",
                "Rating",
                "Created At",
                "Updated At",
              ]}
              sortable={[
                "User",
                "Product",
                "Comment",
                "Rating",
                "Created At",
                "Updated At",
              ]}
              data={reviews.map((review) => {
                return {
                  User: review.user.name,
                  Product: review.product.name,
                  Comment: review.comment,
                  Rating: review.rating,
                  "Created At": dt(review.createdAt),
                  Actions: (
                    <>
                      <Button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(review._id)}
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
