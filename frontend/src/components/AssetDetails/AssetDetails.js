import React, { useState, useEffect } from "react";
import { ButtonGroup, Badge } from "react-bootstrap";
import { BackToHome } from "../BackToHome";
import { Loading } from "../Loading";
import { getAssetById, getUserById } from "../../services/Api";
import { useSelector } from "react-redux";
import { formatDate } from "../../utils";

const AssetDetails = ({ history, match }) => {
  const user = useSelector(({ auth: { user } }) => user);

  const [objAsset, setObjAsset] = useState({
    user: {
      email: "",
      name: "",
      token: ""
    },
    description: {
      title: "",
      stacktrace: ""
    },
    lastOccurrence: {
      date: new Date(),
      user: ""
    },
    origin: "",
    occurrences: 0,
    level: ""
  });

  const [isLoading, setIsLoading] = useState(true);

  const getItemById = async () => {
    setIsLoading(true);
    let data = await getAssetById(match.params.id, user);
    if (data.length === 0)
      history.push("/");
    data.user = await getUser(data.lastOccurrence && data.lastOccurrence.user)
    setObjAsset(data);
    setIsLoading(false);
  };

  const getUser = async (id) => {
    return id ? await getUserById(id, user) : {};   
  }

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
          <h1 className="mb-3">{`Erro no ${objAsset.origin} em ${formatDate(
            objAsset.lastOccurrence && objAsset.lastOccurrence.date
          )}`}</h1>
          <div className="row d-flex align-items-center">
            <div className="col-sm-12 col-md-8">
              <h5>Título</h5>
              <p>{objAsset.description && objAsset.description.title}</p>
              <h5>Detalhes</h5>
              <p>{objAsset.description && objAsset.description.stacktrace}</p>
            </div>
            <div className="offset-md-1 col-sm-12 col-md-3">
              <div>
                <Badge variant="secondary">{objAsset.level}</Badge>
                <h5>Eventos</h5>
                <p>{objAsset.occurrences}</p>
              </div>
              <div>
                <h5>Coletado por</h5>
                <p>{objAsset.user && objAsset.user.name}</p>
                <p style={{overflowWrap: "break-word"}}>{objAsset.user && objAsset.user.token}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssetDetails;
