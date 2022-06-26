import React from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceHistory";
import { useSelector } from "react-redux";
import { deleteMaintenanceHistory } from "../../../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

const Operations = props => { 
  const filteredMaintenanceHistory = useSelector(({ maintenanceProcedure: { filteredMaintenanceHistory } }) => filteredMaintenanceHistory); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const confirmAction = text => window.confirm(text);

  const addMaintenanceHistory = () => {
    props.history.push(`./addmaintenancehistory`);
  };

  const deleteSelected = () => {
    if (confirmAction('Todos os itens selecionados serão excluídos!')) {
      let items = filteredMaintenanceHistory;
      filteredMaintenanceHistory.forEach(item => {
        if (item.selected) {
          if (deleteMaintenanceHistory(item._id, user)){
            items = items.filter(e => e._id !== item._id);
          }
        };
      });      
      dispatch(Actions.setMaintenanceHistory(items));
    };
  };
  
  return (
    <>
      <Button 
        variant="light" 
        className="mr-1" 
        onClick={addMaintenanceHistory}
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