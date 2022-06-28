import React, { useState, useEffect } from "react";
import { ButtonGroup, Card, Form, Button } from "react-bootstrap";
import { createNewMaintenanceProcedure, getAssetById } from "../../../services/Api.js";
import { FormControl } from "../../FormControl";
import { Loading } from "../../Loading";
import { assetTypes, recurrencyTypes } from "../../../utils/index"
import SelectedList from "../../General/SelectedList";
import { BackToHome } from "../../BackToHome";
import { useSelector } from "react-redux";

const CreateMaintenanceProcedure = ({ history, match }) => {
  const user = useSelector(({ auth: { user } }) => user);
  const [validated, setValidated] = useState(false);
  const [assetId, setAssetId] = useState(match.params.id);
  const [assetName, setAssetName] = useState(""); 
  const [assetType, setAssetType] = useState(null); 
  const [maintenanceProcedureName, setMaintenanceProcedureName] = useState("");
  const [maintenanceProcedureDescription, setMaintenanceProcedureDescription] = useState("");  
  const [recurrencyID, setRecurrencyID] = useState(1);
  const [isToAsset, setIsToAsset] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getData = async () => {
    setIsLoading(true);
    let asset = await getAssetById(match.params.id, user);
    if (!asset || asset.length === 0) {
      redirect();
    } 
    setAssetId(asset._id);    
    setAssetName(asset.name);
    setIsLoading(false);
  };

  useEffect(() => {
    if (match.params.id){
      getData();
      setIsToAsset(true);
    }
  }, []);//eslint-disable-line
  
  const changeType = assetType => setAssetType(assetType);
  const changeRecurrency = recurrencyID => setRecurrencyID(recurrencyID);

  const createMaintenanceProcedure = async props => {
    if (await createNewMaintenanceProcedure(maintenanceProcedureName, maintenanceProcedureDescription, assetType, assetId, recurrencyID, user)) {
      redirect();
    }    
  };

  const redirect = () => {
    if (match.params.id){
      history.push(`/details/${match.params.id}`);
    } //O else só será feito quando o cadastro de tipos for desenvolvido.  
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
    createMaintenanceProcedure();
  };

  const handleChange = event => {
    event.preventDefault();
    const { name, value } = event.target;

    let actions = {
      "name": setMaintenanceProcedureName,
      "description": setMaintenanceProcedureDescription,
      "recurrency": setRecurrencyID
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
        <BackToHome history={history} message="Voltar para detalhes" destiny={`/details/${match.params.id}`} />
      </ButtonGroup>
      {isLoading ? (
        <Loading />
      ) : (
      <div className="mb-3 justify-content-center align-items-center">
        <Card style={cardSize}>
          <Card.Header>Novo Procedimento de Manutenção</Card.Header>
          <Card.Body>           
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              {isToAsset ? (
                <Form.Row>
                  <FormControl
                    label="Ativo"
                    type="text"
                    placeholder="-"
                    value={assetName}
                    name="asset"
                    readOnly="true"
                  />
                </Form.Row>                
              ) : (
                <Form.Row>
                  <Form.Group controlId="typeValidation">
                    <Form.Label>Tipo de ativo</Form.Label>                    
                    <SelectedList
                      title="Tipo de ativo"
                      options={assetTypes}
                      handleChange={changeType}
                      classname="p2 pr-1"
                    />
                  </Form.Group>                    
                </Form.Row>
              )}
              <FormControl
                controlId="nomeValidation"
                label="Nome"
                required="true"
                type="text"
                placeholder="Nome"
                value={maintenanceProcedureName}
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
                value={maintenanceProcedureDescription}
                onChange={handleChange}
                autoFocus="false"
                name="description"
                goodFeedback="Descrição válida!"
                badFeedback="Descrição inválida!"
              />  
              <Form.Row>
                <Form.Group controlId="recurrencyValidation">
                  <Form.Label>Recorrência</Form.Label>                    
                  <SelectedList
                    title="Recorrência"
                    options={recurrencyTypes}
                    handleChange={changeRecurrency}
                    classname="p2 pr-1"
                  />
                </Form.Group>                    
              </Form.Row>                 
              <div className="d-flex justify-content-between align-items-end">
                <Button type="submit">Salvar</Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </div>
      )}
    </div>    
  );
};

export default CreateMaintenanceProcedure;
