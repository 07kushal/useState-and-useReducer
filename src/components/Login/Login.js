import React, { useState, useEffect, useReducer } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";

const emailReducer = (state, action) => {
  const { type, payloadValue } = action;
  const { value } = state;
  if (type === "USER_INPUT") {
    return { value: payloadValue, isValid: payloadValue.includes("@") };
  }
  if (type === "INPUT_BLUR") {
    return { value: value, isValid: value.includes("@") };
  }
  console.log({ action, state });
  return { value: "", isValid: false };
};

const passwordReducer = (state, action) => {
  const { type, payloadValue } = action;
  const { value = "" } = state;
  if (type === "USER_INPUT") {
    return { value: payloadValue, isValid: payloadValue.trim().length > 6 };
  }
  if (type === "INPUT_BLUR") {
    return { value: value, isValid: value.trim().length > 6 };
  }
  return { value: "", isValid: false };
};

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState("");
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: "",
    valid: null,
  });
  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: "",
    valid: null,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const { isValid: emailIsValid } = emailState;
  const { isValid: passwordIsValid } = passwordState;

  useEffect(() => {
    const identifer = setTimeout(() => {
      console.log("Checking form validity!");
      setFormIsValid(emailIsValid && passwordIsValid);
    }, 1000);
    return () => {
      console.log("CLEANUP.");
      clearTimeout(identifer);
    };
  }, [emailIsValid, passwordIsValid]);
  // setFormIsValid is optional

  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({ type: "USER_INPUT", payloadValue: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    // setEnteredPassword(event.target.value);
    dispatchPassword({ type: "USER_INPUT", payloadValue: event.target.value });
  };

  const validateEmailHandler = () => {
    // setEmailIsValid(emailState.isValid);
    dispatchEmail({ type: "INPUT_BLUR" });
  };

  const validatePasswordHandler = () => {
    // setPasswordIsValid(enteredPassword.trim().length > 6);
    dispatchPassword({ type: "INPUT_BLUR" });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, passwordState.value);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value}
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordState.isValid === false ? classes.invalid : ""
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={passwordState.value}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={!formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
