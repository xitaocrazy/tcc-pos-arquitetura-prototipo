import React from "react";
import { formatDate } from "../../../utils/index";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceOcurrency";
import { useSelector } from "react-redux";

const Item = props => {
  const filteredMaintenanceOcurrency = useSelector(({ MaintenanceOcurrency: { filteredMaintenanceOcurrency } }) => filteredMaintenanceOcurrency);
  const dispatch = useDispatch()

  const setSelected = key => {
    filteredMaintenanceOcurrency.forEach(item => {      
      if (item._id === key) {        
        if (!item.realizedAt){
          item.selected = !item.selected;
        } else {
          item.selected = false;
        }                
      };
    });
    let items = filteredMaintenanceOcurrency.filter(e => e);
    dispatch(Actions.updateFilteredMaintenanceOcurrency(items));
  };

  const handleChange = () => {
    setSelected(props.item._id);
  };

  const goToMaintenanceProcedurePage = () => {
    //props.history.push(`./managemaintenance/${props.item._id}`);    
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
      <td onClick={goToMaintenanceProcedurePage}>{props.item.maintenanceProcedure.name}</td>
      <td onClick={goToMaintenanceProcedurePage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.maintenanceProcedure.description}</div>
      </td>
      <td onClick={goToMaintenanceProcedurePage}>{formatDate(props.item.scheduledTo)}</td>
      <td onClick={goToMaintenanceProcedurePage}>{formatDate(props.item.realizedAt)}</td>
    </tr>
  );
};

export default Item;
