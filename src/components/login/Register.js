import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import "./Register.css";
import { toast } from "react-toastify";

const Register = ({ handleClose }) => {
  // create state variables for each input
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(firstName, confPassword, email, password);
    //send req to backend
    //if success
    if (true) {
      toast.success("Account Registered, Please Login.");
      handleClose();
    } else {
      //Insert Error here
      toast.error("Error");
    }
  };

  return (
    <form className="Register-Form" onSubmit={handleSubmit}>
      <TextField
        margin="normal"
        fullWidth
        label="First Name"
        variant="filled"
        required
        autoFocus
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
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
      <div className="Form-Buttons">
        <Button variant="outlined" onClick={handleClose}>
          Cancel
        </Button>
        <Button type="submit" variant="contained" color="primary">
          Signup
        </Button>
      </div>
    </form>
  );
};

export default Register;
