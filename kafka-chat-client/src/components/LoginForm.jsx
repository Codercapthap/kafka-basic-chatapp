import { Button, TextField } from "@mui/material";
import React from "react";

const LoginForm = ({ onSubmit }) => {
  const [username, setUsername] = React.useState("");
  let handleUserNameChange = (event) => setUsername(event.target.value);
  let handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(username);
  };
  return (
    <div>
      <TextField
        label="Type your username"
        placeholder="Username"
        onChange={handleUserNameChange}
        margin="normal"
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            handleSubmit(event);
          }
        }}
      />
      <br />
      <Button variant="contained" color="primary" onClick={handleSubmit}>
        Login
      </Button>
    </div>
  );
};

export default LoginForm;
