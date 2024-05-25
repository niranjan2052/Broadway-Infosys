import React from "react";
import { Form } from "react-bootstrap";

export const FormInput = ({
  formik,
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  as,
}) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        type={!as ? type : undefined}
        name={name}
        id={name}
        as={as}
        value={type != "password" ? formik.values[name] : undefined}
        required={required}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        placeholder={placeholder}
        autoComplete="on"
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
