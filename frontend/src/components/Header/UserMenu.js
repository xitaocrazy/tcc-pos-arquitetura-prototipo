import React from "react";
import { Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { logout } from "../../services/Auth";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/auth";
import { useSelector } from "react-redux";

const UserMenu = () => {
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const SetUserLogeOut = () => {
    dispatch(Actions.setAuth(false));
    dispatch(Actions.setUser({}));
  };

  const handleLogout = () => {
    logout(SetUserLogeOut);
  };

  const firstName =
    user && user.name && user.name.split(" ")[0];

  const welcome = isAuth
    ? `Bem-vindo ${firstName}!`
    : `Faça seu login`;

  return (
    <div className="d-flex flex-row justify-content-end align-items-center">
      <Navbar.Text className="d-md-block d-lg-block d-none d-xl-block">
        {welcome}
      </Navbar.Text>
      <NavDropdown
        title={<FontAwesomeIcon icon={faUser} size="2x" />}
        alignRight
      >
        {isAuth ? (
           <Link to={"./login"} onClick={handleLogout} className="px-4 p-2">Sair</Link>
        ) : (
          <div className="d-flex flex-column">
            <Link to={"./login"} className="px-4 p-2">Login</Link>
          </div>
        )}
      </NavDropdown>
    </div>
  );
};

export default UserMenu;
