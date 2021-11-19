import { Formik, Form } from "formik";
import * as Yup from "yup";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "../components/TextField";
import axios from "../api/axios";
import { Container, Grid } from "@material-ui/core";
import NavBar from "../components/NavBar";
import Announcements from "../components/Announcements";
import Alert from "@mui/material/Alert";
import Button from "../components/Button";
import { useState } from "react";
import styled from "styled-components";

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
  email: "",
  pass: "",
};

const formValidations = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  pass: Yup.string().required("Required"),
});

function SignIn() {
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
              severity="error"
              onClose={() => {
                setVisible(false);
              }}
            >
              Invalid Email Address or Password
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
                    .post("/users/login", data, {
                      headers: {
                        "Content-type": "application/json",
                      },
                      withCredentials: true,
                    })
                    .then((res) => {
                      //what to do when user cred are correct
                      console.log("logged in");
                    })
                    .catch(function (err) {
                      if (err.response.status === 404) {
                        setVisible(true);
                      }
                      resetForm(true);
                      setSubmitting(false);
                    });
                }}
              >
                <Form>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Heading>Your Details</Heading>
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="email" label="Email Address" />
                    </Grid>

                    <Grid item xs={12}>
                      <TextField name="pass" label="Password" type="password" />
                    </Grid>

                    <Grid item xs={12}>
                      <Button>Log In</Button>
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

export default SignIn;
