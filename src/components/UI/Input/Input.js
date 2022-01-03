import React from "react";
import classes from "./Input.module.css";

const Input = (props) => {
    const {
        value,
        isValid,
        id,
        onChange,
        onBlur,
        label = "",
        type = "",
    } = props;
    return (
        <div
            className={`${classes.control} ${
                isValid === false ? classes.invalid : ""
            }`}
        >
            <label htmlFor={id}>{label}</label>
            <input
                type={type}
                id={id}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
            />
        </div>
    );
};

export default Input;