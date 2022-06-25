import React from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../store/ducks/asset";
import { useSelector } from "react-redux";
import { archiveAsset, deleteAsset } from "../../services/Api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faArchive } from "@fortawesome/free-solid-svg-icons";
import { isMobile } from "react-device-detect";
import { Button } from "react-bootstrap";

const ArchiveDelete = () => { 
  const filteredAssets = useSelector(({ asset: { filteredAssets } }) => filteredAssets); 
  const user = useSelector(({ auth: { user } }) => user);
  const dispatch = useDispatch();

  const confirmAction = text => window.confirm(text);

  const removeDeleted = (id) => {
    dispatch(Actions.removeAsset(id))
  }

  const archiveSelected = () => {
    if (confirmAction('Todos os itens selecionados serão arquivados!')) {
      filteredAssets.forEach(item => {
        if (item.selected) {
          archiveAsset(item._id, removeDeleted, user);
        };
      });
    };
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
        onClick={archiveSelected}
      >
        <FontAwesomeIcon icon={faArchive} />{" "} {isMobile ? "" : "Arquivar"}
      </Button>
      <Button 
        variant="light" 
        className="mr-1" 
        onClick={deleteSelected}
      >
        <FontAwesomeIcon icon={faTrash} />{" "} {isMobile ? "" : "Apagar"}
      </Button>
    </>
  );
}

export default ArchiveDelete;