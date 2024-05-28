import { Button } from "react-bootstrap";

export const SubmitBtn = ({
  variant = "dark",
  disabled = false,
  icon = "fa-save",
  label = "Save",
  onClick = () => {},
}) => {
  return (
    <Button
      type="submit"
      variant={variant}
      disabled={disabled}
      onClick={onClick}
    >
      <i
        className={`me-2 fa-solid ${disabled ? "fa-spinner fa-spin" : icon} `}
      ></i>
      {label}
    </Button>
  );
};
