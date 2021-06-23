import * as React from "react";

const Nav = (props) => {
  return (
    <nav
      style={{
        background: "pink",
        width: "100%",
        height: "100px",
        color: "white",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "24px",
      }}
    >
      Nav {props.name}
    </nav>
  );
};

export default Nav;
