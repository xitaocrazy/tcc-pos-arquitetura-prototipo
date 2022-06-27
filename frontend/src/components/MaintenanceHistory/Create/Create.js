import React, { useState, useEffect } from "react";
import { ButtonGroup, Card, Form, Button } from "react-bootstrap";
import { createNewMaintenanceHistory, getAssetById, getMaintenanceProcedures } from "../../../services/Api.js";
import { FormControl } from "../../../components/FormControl";
import { Loading } from "../../Loading";
import SelectedList from "../../General/SelectedList";
import { BackToHome } from "../../BackToHome";
import { useSelector, useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceProcedure";

const CreateMaintenanceHistory = ({ history, match }) => {
  const user = useSelector(({ auth: { user } }) => user);
  const [validated, setValidated] = useState(false);
  const [assetId, setAssetId] = useState(match.params.id);
  const [assetName, setAssetName] = useState("");
  const [scheduledTo, setScheduledTo] = useState(null);
  const [maintenanceProcedureId, setMaintenanceProcedureId] = useState(null);
  const [maintenanceProcedures, setMaintenanceProcedures] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const changeType = maintenanceProcedureId => setMaintenanceProcedureId(maintenanceProcedureId);

  const loadMaintenanceProcedures = (data) => {
    dispatch(Actions.setMaintenanceProcedures(data));
  };

  const getData = async () => {
    setIsLoading(true);
    let asset = await getAssetById(match.params.id, user);
    if (!asset || asset.length === 0) {
      redirect();
    } 
    setAssetId(asset._id);    
    setAssetName(asset.name);
    let maintenanceProcedures = await getMaintenanceProcedures(loadMaintenanceProcedures, assetId, asset.type.id, user);
    if (maintenanceProcedures.length === 0) {
      redirect();
    }
    let maintenanceProceduresOptions = maintenanceProcedures.map((item, idx) => {
      return {
        Description: item.description,
        Value: item._id + ""
      }
    });
    setMaintenanceProcedures(maintenanceProceduresOptions);
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);//eslint-disable-line

  const createMaintenanceHistory = async props => {
    if (await createNewMaintenanceHistory(assetId, scheduledTo, maintenanceProcedureId, user)) {
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
    createMaintenanceHistory();
  };

  const handleChange = event => {
    event.preventDefault();
    const { value } = event.target;
    setScheduledTo(value);
  };

  const cardSize = {
    width: "100%",
    minWidth: "100%"
  };

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={history} message="Voltar para lista" />
      </ButtonGroup>
      {isLoading ? (
        <Loading />
      ) : (
      <div className="mb-3 justify-content-center align-items-center">
        <Card style={cardSize}>
          <Card.Header>Novo Ativo</Card.Header>
          <Card.Body>           
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
              <Form.Row>
                <FormControl
                  label="Ativo"
                  type="text"
                  placeholder="-"
                  value={assetName}
                  name="asset"
                  readOnly="true"
                />               
                <Form.Group controlId="tipoValidation">
                  <Form.Label>Procedimento</Form.Label>                    
                  <SelectedList
                    title="Procedimento"
                    options={maintenanceProcedures}
                    handleChange={changeType}
                    classname="p2 pr-1"
                  />
                </Form.Group>                    
              </Form.Row>
              <FormControl
                controlId="scheduledValidation"
                label="Agender Para"
                required="true"
                type="date"
                onChange={handleChange}
                autoFocus="true"
                name="scheduled"
                goodFeedback="Data válida!"
                badFeedback="Data inválida!"
              />                  
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

export default CreateMaintenanceHistory;
