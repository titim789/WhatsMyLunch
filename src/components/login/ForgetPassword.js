import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ForgetPassword.css";
import { toast } from "react-toastify";
import { forgetpassword, forgetpasswordauth } from "../../api";

const Register = ({ handleClose }) => {
  // create state variables for each input
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //send req to backend
    if (!success) {
      console.log(username, email);
      try {
        const auth = await forgetpasswordauth({
          username,
          email,
        });

        //if success
        if (auth.status === 200) {
          toast.success("Authenticated. Please Change your password.");
          setSuccess(true);
        } else {
          //Insert Error here
          toast.error("Username and/or Email does not exist in our system");
        }
      } catch (err) {
        toast.error("Username and/or Email does not exist in our system");
      }
    } else {
      console.log(username, email, password, confPassword);
      try {
        const changePass = await forgetpassword({
          username,
          email,
          password,
          confPassword,
        });

        if (changePass.status === 200) {
          toast.success("Password Changed");
          handleClose();
        }
      } catch (err) {
        toast.error("Failed to change password. Ensure the password matches");
      }
    }
  };

  return (
    <form className="Forget-Password-Form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        label="Username"
        variant="filled"
        required
        autoFocus
        disabled={success}
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        margin="normal"
        fullWidth
        label="Email"
        variant="filled"
        type="email"
        required
        autoFocus
        disabled={success}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {success ? (
        <TextField
          margin="normal"
          fullWidth
          label="Password"
          variant="filled"
          type="password"
          required
          autoFocus
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      ) : null}
      {success ? (
        <TextField
          margin="normal"
          fullWidth
          label="Confirm Password"
          variant="filled"
          type="password"
          required
          autoFocus
          value={confPassword}
          onChange={(e) => setConfPassword(e.target.value)}
        />
      ) : null}
      <div className="Forget-Password-Form-Buttons">
        <Button variant="outlined" onClick={handleClose} style={{}}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          {success ? "Change Password" : "Submit"}
        </Button>
      </div>
    </form>
  );
};

export default Register;
