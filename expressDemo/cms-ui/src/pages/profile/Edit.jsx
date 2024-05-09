import { useFormik } from "formik";
import { Col, Row, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "@/store";
import { setValidationErrors } from "@/lib";
import * as Yup from "yup";
import { FormInput, SubmitBtn } from "../../components";
import http from "@/http";

export const Edit = () => {
  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      name: user.name,
      phone: user.phone,
      address: user.address,
    },
    validationSchema: Yup.object({
      name: Yup.string().required(),
      phone: Yup.string().required().max(30),
      address: Yup.string().required(),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .patch("/profile", values)
        .then(() => http.get("/profile"))
        .then(({ data }) => dispatch(setUser(data)))
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Edit Profile</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput name="name" label="Name" required formik={formik} />
            <FormInput name="phone" label="Phone" required formik={formik} />
            <FormInput
              as="textarea"
              name="address"
              label="Address"
              required
              formik={formik}
            />
            <Form.Group>
              <SubmitBtn disabled={formik.isSubmitting} />
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Col>
  );
};
