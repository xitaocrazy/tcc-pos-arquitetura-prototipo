import React from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceOcurrency";
import { useSelector } from "react-redux";
import { deleteMaintenanceOcurrency } from "../../../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

const Operations = props => { 
  const filteredMaintenanceOcurrency = useSelector(({ MaintenanceOcurrency: { filteredMaintenanceOcurrency } }) => filteredMaintenanceOcurrency); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const confirmAction = text => window.confirm(text);

  const addMaintenanceOcurrency = () => {
    props.history.push(`./addMaintenanceOcurrency/${props.assetId}`);
  };

  const deleteSelected = () => {
    if (confirmAction('Todos os itens selecionados serão excluídos!')) {
      let items = filteredMaintenanceOcurrency;
      filteredMaintenanceOcurrency.forEach(item => {
        if (item.selected) {
          if (deleteMaintenanceOcurrency(item._id, user)){
            items = items.filter(e => e._id !== item._id);
          }
        };
      });      
      dispatch(Actions.setMaintenanceOcurrency(items));
    };
  };
  
  return (
    <>
      <Button 
        variant="light" 
        className="mr-1" 
        onClick={addMaintenanceOcurrency}
      >
        <FontAwesomeIcon icon={faPlus} />{" "} {isMobile ? "" : "Novo"}
      </Button>
      <Button 
        variant="light" 
        className="mr-1" 
        onClick={deleteSelected}
      >
        <FontAwesomeIcon icon={faTrash} />{" "} {isMobile ? "" : "Excluir"}
      </Button>
    </>
  );
}

export default Operations;