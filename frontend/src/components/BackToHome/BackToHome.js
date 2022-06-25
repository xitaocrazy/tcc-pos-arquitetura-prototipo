import React from "react";
import { Button } from "react-bootstrap";

const BackToHome = ({ history, message }) => {
  const goToHomePage = () => {
    history.push("/");
  };

  return (
    <Button variant="primary" onClick={goToHomePage}>
      {message || "Voltar para Home"}
    </Button>
  );
};

export default BackToHome;
