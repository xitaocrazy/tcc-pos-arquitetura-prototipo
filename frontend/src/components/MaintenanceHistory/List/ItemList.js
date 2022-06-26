import React from "react";
import { formatDate } from "../../../utils/index";

const Item = props => {
  const goToMaintenanceProcedurePage = () => {
    console.log(props.item)
    props.history.push(`./managemaintenance/${props.item._id}`);    
  };

  return (
    <tr>
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
