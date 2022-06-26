import React, { useState, useEffect } from "react";
import { ButtonGroup } from "react-bootstrap";
import { BackToHome } from "../../BackToHome";
import { Loading } from "../../Loading";
import { getAssetById } from "../../../services/Api";
import { useSelector } from "react-redux";

const AssetDetails = ({ history, match }) => {
  const user = useSelector(({ auth: { user } }) => user);

  const [objAsset, setObjAsset] = useState({
    id: null,
    name: "",
    type: {
      id: null,
      description: ""
    },
    description: "",
    maintenanceProcedures: 0
  });

  const [isLoading, setIsLoading] = useState(true);

  const getItemById = async () => {
    setIsLoading(true);
    let data = await getAssetById(match.params.id, user);
    if (data.length === 0)
      history.push("/");
    setObjAsset(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getItemById();
  }, []);//eslint-disable-line

  return (
    <div className="m-3 p-4">
      <ButtonGroup className="mb-3">
        <BackToHome history={history} message="Voltar para lista" />
      </ButtonGroup>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          
        </div>
      )}
    </div>
  );
};

export default AssetDetails;