import { Button } from "grommet";

const ConfirmButton = (props) => {
  return (
    <Button
      type="submit"
      size="small"
      style={{ borderRadius: "4px" }}
      primary
      color={props.color}
      label={props.label}
      {...props}
    />
  );
};

export default ConfirmButton;
