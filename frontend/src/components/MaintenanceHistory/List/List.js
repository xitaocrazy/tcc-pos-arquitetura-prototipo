import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getMaintenanceHistory } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceHistory";
import { useSelector } from "react-redux";

const List = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const setMaintenanceHistory = (data) => {    
    dispatch(Actions.setMaintenanceHistory(data));
  };

  const getListMaintenanceHistory = async () => {    
    await getMaintenanceHistory(setMaintenanceHistory, props.assetId, user);
  };

  useEffect(() => {
    getListMaintenanceHistory();
  }, []); //eslint-disable-line

  return (
    <div className="m-3 p-2 px-md-4 px-xl-4">
      <HeaderList history={props.history}/>
      <Items history={props.history}/>
    </div>
  );
};

export default List;
