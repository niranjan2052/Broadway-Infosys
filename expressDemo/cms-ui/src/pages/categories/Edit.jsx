import { useFormik } from "formik";
import { Row, Col } from "react-bootstrap";
import { Loading } from "@/components";
import * as Yup from "yup";
import http from "@/http";
import { setValidationErrors } from "@/lib";
import YupPassword from "yup-password";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataForm } from "./DataForm";

YupPassword(Yup);

export const Edit = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .patch(`cms/catagory/${params.id}`, values)
        .then(() => navigate("/categories"))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(setSubmitting(false));
    },
  });

  useEffect(() => {
    http
      .get(`cms/catagory/${params.id}`)
      .then(({ data }) =>
        formik.setValues({
          name: data.name,
          status: data.status,
        })
      )
      .catch(() => {})
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return loading ? (
    <Loading />
  ) : (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Edit Category</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <DataForm formik={formik} isEdit />
        </Col>
      </Row>
    </Col>
  );
};
