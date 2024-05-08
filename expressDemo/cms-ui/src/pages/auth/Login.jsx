import { useFormik } from "formik";
import { Col, Form, Row, Button } from "react-bootstrap";
import * as Yup from "yup";
import { useState } from "react";
import http from "../../http";
import { SubmitBtn, FormInput } from "../../components";
import { setValidationErrors, inStorage } from "@/lib";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "@/store";

export const Login = () => {
  const [remember, setRemember] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required().email(),
      password: Yup.string().required(),
    }),
    onSubmit: (value, { setSubmitting }) => {
      http
        .post("/auth/login", value)
        .then(({ data }) => {
          inStorage("mern", data.token, remember);
          return http.get("/profile");
        })
        .then(({ data }) => {
          dispatch(setUser(data));
          navigate("/");
        })
        .catch(({ response }) => setValidationErrors(formik, response))
        .finally(() => setSubmitting(false));
    },
  });

  return (
    <>
      <Col
        xl={4}
        lg={5}
        sm={8}
        xs={10}
        className="bg-white py-3 my-5 rounded-2 shadow-sm mx-auto"
      >
        <Row>
          <Col className="text-center">
            <h1>Login</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form onSubmit={formik.handleSubmit}>
              <FormInput
                formik={formik}
                type="email"
                name="email"
                label="Email"
                required
                placeholder="Enter your Email"
              />
              <FormInput
                formik={formik}
                type="password"
                name="password"
                label="Password"
                required
                placeholder="Enter your Password"
              />
              <Form.Check className="mb-3">
                <Form.Check.Input
                  name="remember"
                  id="remember"
                  value={true}
                  checked={remember}
                  onChange={() => setRemember(!remember)}
                />
                <Form.Check.Label htmlFor="remember">
                  Remember Me
                </Form.Check.Label>
                {remember ? (
                  <div className="text-success">Stay! Logged In!</div>
                ) : undefined}
              </Form.Check>
              <Form.Group className="d-grid">
                <SubmitBtn
                  label="Log In"
                  icon="fa-arrow-right-to-bracket"
                  disabled={formik.isSubmitting}
                />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Col>
    </>
  );
};
