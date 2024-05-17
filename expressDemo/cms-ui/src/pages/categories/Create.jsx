import { useFormik } from "formik";
import { Col, Row } from "react-bootstrap";
import { setValidationErrors } from "@/lib";
import * as Yup from "yup";
import YupPassword from "yup-password";
import http from "@/http";
import { useNavigate } from "react-router-dom";
import { DataForm } from "./DataForm";

YupPassword(Yup);

export const Create = () => {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: "",
      status: false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/cms/catagory", values)
        .then(() => navigate("/categories"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Add Category</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataForm formik={formik} />
        </Col>
      </Row>
    </Col>
  );
};
