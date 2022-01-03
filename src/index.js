import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import App from "./App";
import { AuthContextProvide } from "./store/AuthContext";

ReactDOM.render(
    <AuthContextProvide>
        <App />
    </AuthContextProvide>,
    document.getElementById("root")
);
