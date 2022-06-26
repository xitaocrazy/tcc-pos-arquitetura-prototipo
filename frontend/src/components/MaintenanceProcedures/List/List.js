import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getAssetMaintenanceProcedures } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceProcedure";
import { useSelector } from "react-redux";

const List = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const setMaintenanceProcedures = (data) => {
    dispatch(Actions.setMaintenanceProcedures(data));
  };

  const getListMaintenanceProcedures = async () => {    
    await getAssetMaintenanceProcedures(setMaintenanceProcedures, props.assetId, props.assetType, user);
  };

  useEffect(() => {
    getListMaintenanceProcedures();
  }, []); //eslint-disable-line

  return (
    <div className="m-3 p-2 px-md-4 px-xl-4">
      <HeaderList history={props.history}/>
      <Items history={props.history} isMaintenanceManagement={props.isMaintenanceManagement}/>
    </div>
  );
};

export default List;