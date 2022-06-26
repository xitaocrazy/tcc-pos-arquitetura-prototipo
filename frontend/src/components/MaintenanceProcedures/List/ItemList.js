import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceProcedure";
import { useSelector } from "react-redux";
const Item = props => {
  const filteredMaintenanceProcedures = useSelector(({ maintenanceProcedure: { filteredMaintenanceProcedures } }) => filteredMaintenanceProcedures);
  const dispatch = useDispatch()

  const setSelected = key => {
    filteredMaintenanceProcedures.forEach(item => {      
      if (item._id === key) {
        if(item.assetType === null){
          item.selected = !item.selected;
        } else{
          item.selected = false;
        }        
      };
    });
    let items = filteredMaintenanceProcedures.filter(e => e);
    dispatch(Actions.updateFilteredMaintenanceProcedures(items));
  };

  const handleChange = () => {
    setSelected(props.item._id);
  };

  const goToMaintenanceProcedurePage = () => {
    if (props.isMaintenanceManagement) {
      props.history.push(`./details/${props.item._id}`);
    }    
  };

  return (
    <tr>
      <th scope="row" style={{ cursor: "pointer" }}>
        <Form.Check
          inline
          type="checkbox"
          value={props.item.selected}
          checked={props.item.selected}
          onChange={() => handleChange()}
        />
      </th>
      <td onClick={goToMaintenanceProcedurePage}>{props.item.name}</td>
      <td onClick={goToMaintenanceProcedurePage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.assetType == null ? "Personalizada" : "Por Tipo"}</div>
      </td>
      <td onClick={goToMaintenanceProcedurePage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.description}</div>
      </td>
      <td onClick={goToMaintenanceProcedurePage}>{props.item.recurrency.description}</td>
    </tr>
  );
};

export default Item;
