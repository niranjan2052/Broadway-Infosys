import { useFormik } from "formik";
import { Col, Row, Form } from "react-bootstrap";
import { setValidationErrors } from "@/lib";
import * as Yup from "yup";
import { FormInput, SubmitBtn } from "../../components";
import YupPassword from "yup-password";
import http from "@/http";

YupPassword(Yup);

export const Password = () => {
  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().required(),
      newPassword: Yup.string()
        .required()
        .minLowercase(1)
        .minUppercase(1)
        .minNumbers(1)
        .minSymbols(1),
      confirmPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("newPassword")], "Password not Confirmed"),
    }),
    onSubmit: (values, { setSubmitting }) => {
      http
        .patch("/profile/password", values)
        .then(() => {})
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });
  return (
    <Col className="bg-white px-3 py-5 mx-2 my-4">
      <Row>
        <Col>
          <h1>Change Password</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form onSubmit={formik.handleSubmit}>
            <FormInput
              type="password"
              name="oldPassword"
              label="oldPassword"
              required
              formik={formik}
            />
            <FormInput
              type="password"
              name="newPassword"
              label="newPassword"
              required
              formik={formik}
            />
            <FormInput
              type="password"
              name="confirmPassword"
              label="confirmPassword"
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
