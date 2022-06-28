import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getMaintenanceOcurrency } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceOcurrency";
import { useSelector } from "react-redux";

const List = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const setMaintenanceOcurrency = (data) => {    
    dispatch(Actions.setMaintenanceOcurrency(data));
  };

  const getListMaintenanceOcurrency = async () => {    
    await getMaintenanceOcurrency(setMaintenanceOcurrency, props.assetId, user);
  };

  useEffect(() => {
    getListMaintenanceOcurrency();
  }, []); //eslint-disable-line

  return (
    <div className="m-3 p-2 px-md-4 px-xl-4">
      <HeaderList history={props.history} assetId={props.assetId} assetName={props.assetName}/>
      <Items history={props.history}/>
    </div>
  );
};

export default List;
