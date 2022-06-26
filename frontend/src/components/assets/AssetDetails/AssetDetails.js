import React, { useState, useEffect } from "react";
import { ButtonGroup, Card, Form, Button } from "react-bootstrap";
import { BackToHome } from "../../BackToHome";
import { Loading } from "../../Loading";
import { getAssetById } from "../../../services/Api";
import { useSelector } from "react-redux";
import { editExistingAsset } from "../../../services/Api.js";
import { FormControl } from "../../../components/FormControl";
import { Link } from "react-router-dom";

const AssetDetails = ({ history, match }) => {
  const user = useSelector(({ auth: { user } }) => user);
  const [validated, setValidated] = useState(false);
  const [assetId, setAssetId] = useState("");
  const [assetName, setAssetName] = useState("");
  const [assetDescription, setDescription] = useState("");
  const [assetType, setAssetType] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const getItemById = async () => {
    setIsLoading(true);
    let data = await getAssetById(match.params.id, user);
    if (data.length === 0) {
      redirect();
    }      
    setAssetId(data._id);
    setAssetName(data.name);
    setDescription(data.description);
    setAssetType(data.type.description);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemById();
  }, []);//eslint-disable-line

  const editAsset = async props => {
    if (await editExistingAsset(assetId, assetName, assetDescription, assetType)) {
        redirect();
      }    
  };

  const redirect = () => {
    history.push("/");
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
    editAsset();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      "name": setAssetName,
      "description": setDescription,
      "type": setAssetType
    };

    actions[name](value);
  };

  const cardSize = {
    width: "250px",
    minWidth: "250px"
  };

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={history} message="Voltar para lista" />
      </ButtonGroup>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="p-5 d-flex justify-content-center align-items-center">
          <Card style={cardSize}>
            <Card.Header>Novo Ativo</Card.Header>
            <Card.Body>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Form.Row>
                  <Form.Control
                    label="Id"
                    type="text"
                    placeholder="-"
                    value={assetId}
                    name="id"
                    readOnly
                  />
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
                  <FormControl
                    controlId="typeValidation"
                    label="Tipo"
                    required="true"
                    type="text"
                    placeholder="-"
                    value={assetType}
                    onChange={handleChange}
                    name="type"
                    goodFeedback="Tipo válido!"
                    badFeedback="Tipo inválido!"
                  />
                </Form.Row>
                <div className="d-flex justify-content-between align-items-end">
                  <Button type="submit">Salvar</Button>
                  <Link to={"../"}>Voltar</Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;