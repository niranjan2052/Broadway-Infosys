import React from "react";
import { Form } from "react-bootstrap";

export const FormInput = ({
  formik,
  label,
  type = "text",
  name,
  placeholder,
  required = false,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        type={type}
        name={name}
        id={name}
        value={type != "password" ? formik.values[name] : undefined}
        required={required}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        isInvalid={formik.touched[name] && formik.errors[name]}
      />

      {formik.touched[name] && formik.errors[name] && (
        <Form.Control.Feedback type="invalid">
          {formik.errors[name]}
        </Form.Control.Feedback>
      )}
    </Form.Group>
  );
};
