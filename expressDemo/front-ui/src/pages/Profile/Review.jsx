import { useEffect, useState } from "react";
import http from "@/http";
import { Col, Row } from "react-bootstrap";
import { DataTable, Loading } from "@/components";
import { dt } from "@/lib";

export const Review = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    http
      .get("/profile/reviews")
      .then(({ data }) => setReviews(data))
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <Row>
      <Col>
      <DataTable
              searchable={[
                "Product",
                "Comment",
                "Rating",
                "Created At",
              ]}
              sortable={[
                "Product",
                "Comment",
                "Rating",
                "Created At",
              ]}
              data={reviews.map((review) => {
                return {
                  Product: review.product.name,
                  Comment: review.comment,
                  Rating: review.rating,
                  "Created At": dt(review.createdAt),
               
                };
              })}
            />
      </Col>
    </Row>
  );
};
