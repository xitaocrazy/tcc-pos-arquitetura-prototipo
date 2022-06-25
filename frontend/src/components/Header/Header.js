import React from "react";
import { Navbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons";
import UserMenu from "./UserMenu.js";
import { Link } from "react-router-dom";

const Header = () => (
  <Navbar
    bg="dark"
    variant="dark"
    sticky="top"
    expand="lg"
    className="d-flex align-items-center justify-content-between"
  >
    <Navbar.Brand>
      <Link to="/">
        <FontAwesomeIcon
          icon={faReact}
          size="2x"
          className="d-inline-block align-middle"
        />{" "}
        Gerenciamento de Ativos
      </Link>
    </Navbar.Brand>
    <UserMenu />
  </Navbar>
);

export default Header;
