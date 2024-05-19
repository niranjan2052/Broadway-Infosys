import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { setValidationErrors } from "@/lib";
import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "@/http";
import { useNavigate } from "react-router-dom";
import { DataForm } from "./DataForm";
import { useState } from "react";

YupPassword(Yup);

export const Create = () => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      summary: "",
      description: "",
      price: "",
      discounted_price: "",
      images: [],
      catagoryId: "",
      brandId: "",
      status: true,
      featured: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      summary: Yup.string().required(),
      description: Yup.string().required(),
      price: Yup.number().required(),
      discounted_price: Yup.number(),
      catagoryId: Yup.string().required(),
      brandId: Yup.string().required(),
      status: Yup.boolean().required(),
      featured: Yup.boolean().required(),
      images: Yup.array()
        .test("fileCount", "Select atleast 1 image", (item) => item.length > 0)
        .test("fileType", "All files must be valid image", (item) => {
          for (let img of item) {
            if (!img.type.startsWith("image/")) {
              return false;
            }
          }
          return true;
        }),
    }),
    onSubmit: (values, { setSubmitting }) => {
      let fd = new FormData();
      for (let k in values) {
        if (k == "images") {
          for (let image of values[k]) {
            fd.append(k, image);
          }
        } else {
          fd.append(k, values[k]);
        }
      }
      http
        .post("/cms/products", fd, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(() => navigate("/products"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Add Product</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataForm formik={formik} loading={loading} setLoading={setLoading} />
        </Col>
      </Row>
    </Col>
  );
};
