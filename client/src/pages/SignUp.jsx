import React, { useState } from "react";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Announcements from "../components/Announcements";
import styled from "styled-components";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "../components/TextField";
import Button from "../components/Button";
import Alert from "@mui/material/Alert";
import axios from "../api/axios";

const FormWrapper = styled.div`
  margin: 20px 10px;
`;
const Heading = styled.h4`
  font-size: 30px;
`;

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    // backgroundColor: "teal",
    marginTop: theme.spacing(5),
    marginBottom: theme.spacing(8),
  },
  container: {
    border: "1px solid black",
    borderRadius: "20px",
  },
  btn: {
    color: "teal",
  },
}));

const initialFormState = {
  name: "",
  email: "",
  password: "",
  confirmPass: "",
};

const formValidations = Yup.object().shape({
  name: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
  confirmPass: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password must match"
  ),
});
function SignUp() {
  const [visible, setVisible] = useState(false);
  const classes = useStyles();

  return (
    <div>
      <Announcements />
      <NavBar />

      <Grid container>
        {visible ? (
          <Container maxWidth="xs">
            <Alert
              severity="success"
              onClose={() => {
                setVisible(false);
              }}
            >
              Account successfully created.
            </Alert>
          </Container>
        ) : null}
        <Grid item className={classes.mainGrid} xs={12}>
          <Container maxWidth="sm" className={classes.container}>
            <FormWrapper>
              <Formik
                initialValues={{ ...initialFormState }}
                validationSchema={formValidations}
                onSubmit={(values, { setSubmitting, resetForm }) => {
                  const data = JSON.stringify(values);

                  axios
                    .post("/users/signup", data, {
                      headers: {
                        "Content-type": "application/json",
                      },
                    })
                    .then((res) => {
                      setVisible(true);
                      resetForm(true);
                      setSubmitting(false);
                    })
                    .catch((err) =>
                      console.log("Error!! Cannot send login data")
                    );
                }}
              >
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Heading>Your Details</Heading>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="name" label="Full Name" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="email" label="Email Address" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="password"
                        label="Password"
                        type="password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField
                        name="confirmPass"
                        label="Confirm Password"
                        type="password"
                      />
                    </Grid>

                    <Grid item xs={12}>
                      <Button>Sign Up</Button>
                    </Grid>
                  </Grid>
                </Form>
              </Formik>
            </FormWrapper>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}

export default SignUp;
