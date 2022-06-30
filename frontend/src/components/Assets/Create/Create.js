import React, { useState } from "react";
import { ButtonGroup, Card, Form, Button } from "react-bootstrap";
import { createNewAsset } from "../../../services/Api.js";
import { FormControl } from "../../../components/FormControl";
import { assetTypes } from "../../../utils/index"
import SelectedList from "../../General/SelectedList";
import { BackToHome } from "../../BackToHome";
import { useSelector } from "react-redux";

const CreateAsset = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const [validated, setValidated] = useState(false);
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setDescription] = useState("");
  const [assetType, setAssetType] = useState(0);

  const changeType = assetType => setAssetType(assetType);

  const createAsset = async props => {
    if (await createNewAsset(assetName, assetType, assetDescription, user)) {
        redirect();
      }    
  };

  const redirect = () => {
    props.history.push("/");
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
    createAsset();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      "name": setAssetName,
      "description": setDescription
    };

    actions[name](value);
  };

  const cardSize = {
    width: "100%",
    minWidth: "100%"
  };

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={props.history} message="Voltar para lista" />
      </ButtonGroup>
      <div className="mb-3 justify-content-center align-items-center">
        <Card style={cardSize}>
          <Card.Header>Novo Ativo</Card.Header>
          <Card.Body>           
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <Form.Group controlId="tipoValidation">
                  <Form.Label>Tipo</Form.Label>                    
                  <SelectedList
                    title="Tipo de ativo"
                    options={assetTypes}
                    handleChange={changeType}
                    classname="p2 pr-1"
                  />
                </Form.Group>                    
              </Form.Row>
              <FormControl
                controlId="nomeValidation"
                label="Nome"
                required="true"
                type="text"
                placeholder="Nome"
                value={assetName}
                onChange={handleChange}
                autoFocus="true"
                name="name"
                goodFeedback="Nome válido!"
                badFeedback="Nome inválido!"
              />              
              <FormControl
                controlId="descriptionValidation"
                label="Descrição"
                required="true"
                type="text"
                placeholder="Detalhes do ativo"
                value={assetDescription}
                onChange={handleChange}
                autoFocus="false"
                name="description"
                goodFeedback="Descrição válida!"
                badFeedback="Descrição inválida!"
              />                   
              <div className="d-flex justify-content-between align-items-end">
                <Button type="submit">Salvar</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>    
  );
};

export default CreateAsset;
