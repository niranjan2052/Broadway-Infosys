import { Button } from "react-bootstrap";

export const SubmitBtn = ({
  variant = "dark",
  disabled = false,
  icon = "fa-save",
  label = "Save",
}) => {
  return (
    <Button type="submit" variant={variant} disabled={disabled}>
      <i
        className={`me-2 fa-solid ${disabled ? "fa-spinner fa-spin" : icon} `}
      ></i>
      {label}
    </Button>
  );
};
