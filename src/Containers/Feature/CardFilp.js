import React from "react";
import "./style.css";



const YOUR_FRONT_CCOMPONENT = (props) => {

    return (
        <>
            {props.children}
        </>
    );
};


const YOUR_BACK_COMPONENT = (props) => {

    return (
        <>
            {props.children}
        </>
    );
};



export { YOUR_FRONT_CCOMPONENT, YOUR_BACK_COMPONENT };
