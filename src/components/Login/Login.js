import React, { useState, useEffect, useReducer, useContext } from "react";

import Card from "../UI/Card/Card";
import classes from "./Login.module.css";
import Button from "../UI/Button/Button";
import AuthContext from "../../store/AuthContext";
import Input from "../UI/Input/Input";

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
        dispatchPassword({
            type: "USER_INPUT",
            payloadValue: event.target.value,
        });
    };

    const validateEmailHandler = () => {
        // setEmailIsValid(emailState.isValid);
        dispatchEmail({ type: "INPUT_BLUR" });
    };

    const validatePasswordHandler = () => {
        // setPasswordIsValid(enteredPassword.trim().length > 6);
        dispatchPassword({ type: "INPUT_BLUR" });
    };
    // const authCtx = useContext(AuthContext);
    const { onLogin } = useContext(AuthContext);
    const submitHandler = (event) => {
        event.preventDefault();
        onLogin(emailState.value, passwordState.value);
    };

    return (
        <Card className={classes.login}>
            <form onSubmit={submitHandler}>
                <Input
                    value={emailState.value}
                    isValid={emailState.isValid}
                    id={"email"}
                    onChange={emailChangeHandler}
                    onBlur={validateEmailHandler}
                    label={"E-Mail"}
                    type={"email"}
                />
                <Input
                    value={passwordState.value}
                    isValid={passwordState.isValid}
                    id={"password"}
                    onChange={passwordChangeHandler}
                    onBlur={validatePasswordHandler}
                    label={"Password"}
                    type={"password"}
                />
                <div className={classes.actions}>
                    <Button
                        type="submit"
                        className={classes.btn}
                        disabled={!formIsValid}
                    >
                        Login
                    </Button>
                </div>
            </form>
        </Card>
    );
};

export default Login;
