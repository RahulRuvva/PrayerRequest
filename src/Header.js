import { useState } from "react";

const Header = (props) => {
    const [name, setEx]= useState("");

   const changeName = () => {
        setEx('GOD Always');
    }
    return (
        <div>
            <h1></h1>
        </div>
    )
};

export default Header;

//useState is a hook, utitlity functions, these are dynamic variables, these are used.