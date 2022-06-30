import React from "react";
import { Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSadCry } from "@fortawesome/free-solid-svg-icons";
import { BackToHome } from "../../components/BackToHome";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

const NotFound = ({ history }) => {
  const isAuth = useSelector(({ auth: { isAuth } }) => isAuth);

  return (
    isAuth ? (
      <Card className="text-center">
        <Card.Header>Erro 404</Card.Header>
        <Card.Body>
          <Card.Title>Ops! Página não encontrada :(</Card.Title>
          <Card.Text>
            <FontAwesomeIcon
              icon={faSadCry}
              style={{ color: "#C0C0C0", padding: "20px" }}
              size="10x"
            />
          </Card.Text>
          <BackToHome history={history} />
        </Card.Body>
      </Card>
      ) : (
        <Redirect to={{ pathname: "./login", state: { from: {pathname: "404 Not Found"} } }}/>
      )
    );
  };

export default NotFound;
