import { useFormikContext } from "formik";
import { Button } from "@material-ui/core";

function ButtonWrapper({ children, ...otherProps }) {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  };

  const configBtn = {
    variant: "contained",
    // color: "primary",
    // fullWidth: true,
    onClick: handleSubmit,
  };
  return (
    <Button
      {...configBtn}
      style={{
        backgroundColor: "#21b6ae",
        color: "white",
      }}
    >
      {children}
    </Button>
  );
}

export default ButtonWrapper;
