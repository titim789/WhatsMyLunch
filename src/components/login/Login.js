import {
  Box,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Typography,
  Container,
  Dialog,
} from "@mui/material";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import { useCookies } from "react-cookie";

import { login } from "../../api/index";
import Register from "./Register";
import ForgetPassword from "./ForgetPassword";

const Login = ({ setHasAccess }) => {
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies();
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  const [openForgetPasswordForm, setForgetPasswordForm] = useState(false);

  //handles open/close of the register modal form
  const handleRegisterForm = () => {
    setOpenRegisterForm((openRegisterForm) => !openRegisterForm);
  };

  //handles open/close of the foget password modal form
  const handleForgetPasswordForm = () => {
    setForgetPasswordForm((openForgetPasswordForm) => !openForgetPasswordForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const password = data.get("password");
    if (!username | !password) {
      console.error("Either Username or Password is empty");
      toast.error("Either Username or Password is empty");
    } else {
      login({ username: username, password: password })
        .then((res) => {
          const msg = res.data["msg"];
          // console.log(res.data["accessToken"]);
          toast.success("Login Successful");
          setCookie("access_token", res.data["accessToken"]);
          setHasAccess(true);
          navigate("/");
        })
        .catch((err) => {
          console.log(err);
          if (
            err.response.data.msg === "Wrong Password" ||
            err.response.data.msg === "Username not found"
          ) {
            toast.error("Username/Password is wrong");
          } else {
            toast.error(err.response.data.msg);
          }
        });
    }
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      style={{ background: "white", padding: "30px", border: "solid 1px" }}
    >
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={handleForgetPasswordForm} variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={handleRegisterForm} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <Dialog open={openRegisterForm} onClose={handleRegisterForm}>
        <Register handleClose={handleRegisterForm} />
      </Dialog>
      <Dialog open={openForgetPasswordForm} onClose={handleForgetPasswordForm}>
        <ForgetPassword handleClose={handleForgetPasswordForm} />
      </Dialog>
    </Container>
  );
};

export default Login;
