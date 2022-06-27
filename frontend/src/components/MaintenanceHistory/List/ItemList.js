import React from "react";
import { formatDate } from "../../../utils/index";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceHistory";
import { useSelector } from "react-redux";

const Item = props => {
  const filteredMaintenanceHistory = useSelector(({ maintenanceHistory: { filteredMaintenanceHistory } }) => filteredMaintenanceHistory);
  const dispatch = useDispatch()

  const setSelected = key => {
    filteredMaintenanceHistory.forEach(item => {      
      if (item._id === key) {
        item.selected = !item.selected;        
      };
    });
    let items = filteredMaintenanceHistory.filter(e => e);
    dispatch(Actions.updateFilteredMaintenanceHistory(items));
  };

  const handleChange = () => {
    setSelected(props.item._id);
  };

  const goToMaintenanceProcedurePage = () => {
    props.history.push(`./managemaintenance/${props.item._id}`);    
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
      <td onClick={goToMaintenanceProcedurePage}>{formatDate(props.item.scheduledTo)}</td>
    </tr>
  );
};

export default Item;
