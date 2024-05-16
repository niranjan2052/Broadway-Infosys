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
      email: "",
      phone: "",
      address: "",
      status: false,
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      email: Yup.string().required().email(),
      phone: Yup.string().required().max(30),
      address: Yup.string().required(),
      status: Yup.boolean().required(),
      password: Yup.string()
        .required()
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password")], "Password not Confirmed"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .post("/cms/customer", values)
        .then(() => navigate("/customers"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Add Customer</h1>
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
