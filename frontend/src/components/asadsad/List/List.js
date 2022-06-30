import React, { useEffect } from "react";
import Items from "./ItemsList";
import HeaderList from "./HeaderList";
import { getAssets } from "../../../services/Api";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/asset";
import { useSelector } from "react-redux";

const List = props => {
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const setAssets = (data) => {
    dispatch(Actions.setAssets(data));
  };

  const getListAssets = async () => {    
    await getAssets(setAssets, user);
  };

  useEffect(() => {
    getListAssets();
  }, []); //eslint-disable-line

  return (
    <div className="m-3 p-2 px-md-4 px-xl-4">
      <HeaderList history={props.history}/>
      <Items history={props.history}/>
    </div>
  );
};

export default List;
