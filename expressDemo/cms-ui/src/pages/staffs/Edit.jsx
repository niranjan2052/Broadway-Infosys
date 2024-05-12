import { useFormik } from "formik";
import { Row, Col, Form, FormLabel, Dropdown } from "react-bootstrap";
import { FormInput, SubmitBtn, Loading } from "@/components";
import ReactSwitch from "react-switch";
import * as Yup from "yup";
import http from "@/http";
import { setValidationErrors } from "@/lib";
import YupPassword from "yup-password";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataForm } from "./DataForm";

YupPassword(Yup);

export const Edit = () => {
  const params = useParams();
  const [loading, setLoading] = useState(true);

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      address: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required().max(30),
      address: Yup.string().required(),
      status: Yup.boolean().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      http
        .patch(`cms/staffs/${params.id}`, values)
        .then(({ data }) => {
          dispatch(setStaff(data));
        })
        .catch(({ response }) => setValidationErrors(response))
        .finally(setSubmitting(false));
    },
  });

  useEffect(() => {
    http
      .get(`cms/staffs/${params.id}`)
      .then(({ data }) =>
        formik.setValues({
          name: data.name,
          phone: data.phone,
          address: data.address,
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
          <h1>Edit Staff</h1>
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
