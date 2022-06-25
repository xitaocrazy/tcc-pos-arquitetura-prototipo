import React from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/asset";
import { useSelector } from "react-redux";
import { deleteAsset } from "../../../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

const ArchiveDelete = props => { 
  const filteredAssets = useSelector(({ asset: { filteredAssets } }) => filteredAssets); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const confirmAction = text => window.confirm(text);

  const removeDeleted = (id) => {
    dispatch(Actions.removeAsset(id))
  }

  const createAsset = () => {
    props.history.push(`./createasset`);
  };

  const deleteSelected = () => {
    if (confirmAction('Todos os itens selecionados serão excluídos!')) {
      filteredAssets.forEach(item => {
        if (item.selected) {
          deleteAsset(item._id, removeDeleted, user);
        };
      });
    };
  };
  
  return (
    <>
      <Button 
        variant="light" 
        className="mr-1" 
        onClick={createAsset}
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

export default ArchiveDelete;