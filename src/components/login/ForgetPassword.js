import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./ForgetPassword.css";
import { toast } from "react-toastify";

const Register = ({ handleClose }) => {
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, email);
    //send req to backend
    //if success
    if (true) {
      toast.success("Authenticated. Please Change your password.");
      setSuccess(true);
    } else {
      //Insert Error here
      toast.error("Error");
    }
  };

  return (
    <form className="Forget-Password-Form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        label="First Name"
        variant="filled"
        required
        autoFocus
        disabled={success}
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
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
