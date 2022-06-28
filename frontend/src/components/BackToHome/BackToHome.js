import React from "react";
import { Button } from "react-bootstrap";

const BackToHome = (props) => {
  const goToHomePage = () => {
    props.history.push(props.destiny || "/");
  };

  return (
    <Button variant="primary" onClick={goToHomePage}>
      {props.message || "Voltar para Home"}
    </Button>
  );
};

export default BackToHome;
