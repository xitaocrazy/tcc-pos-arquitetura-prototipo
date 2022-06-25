import React, { useState } from "react";
import { Card, Form, Button } from "react-bootstrap";
import { createNewUser } from "../../services/Api.js";
import { FormControl } from "../../components/FormControl";
import { Link } from "react-router-dom";

const SignUp = props => {
  const [validated, setValidated] = useState(false);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const createUser = async props => {
    if (await createNewUser(userName, userEmail, userPassword)) {
      redirect();
    }
  };

  const redirect = () => {
    props.history.push("/login");
  };

  const handleSubmit = event => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
      return;
    }
    setValidated(true);
    createUser();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      "nome": setUserName,
      "email": setUserEmail,
      "password": setUserPassword
    };

    actions[name](value);
  };

  const cardSize = {
    width: "250px",
    minWidth: "250px"
  };

  return (
    <div className="p-5 d-flex justify-content-center align-items-center">
      <Card style={cardSize}>
        <Card.Header>Novo Usuário</Card.Header>
        <Card.Body>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Row>
              <FormControl
                controlId="nomeValidation"
                label="Nome"
                required="true"
                type="text"
                placeholder="Nome"
                value={userName}
                onChange={handleChange}
                autoFocus="true"
                name="nome"
                goodFeedback="Nome válido!"
                badFeedback="Nome inválido!"
              />
              <FormControl
                controlId="emailValidation"
                label="Email"
                required="true"
                type="email"
                placeholder="exemplo@email.com"
                value={userEmail}
                onChange={handleChange}
                autoFocus="false"
                name="email"
                goodFeedback="Email válido!"
                badFeedback="Email inválido!"
              />
              <FormControl
                controlId="passwordValidation"
                label="Senha"
                required="true"
                type="password"
                placeholder="******"
                value={userPassword}
                onChange={handleChange}
                name="password"
                goodFeedback="Senha válida!"
                badFeedback="Senha inválida!"
              />
            </Form.Row>
            <div className="d-flex justify-content-between align-items-end">
              <Button type="submit">Salvar</Button>
              <Link to={"./login"}>Login</Link>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
