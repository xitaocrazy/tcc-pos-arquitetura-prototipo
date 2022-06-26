import axios from "axios";
import { setupCache } from "axios-cache-adapter";
import { assetsList, maintenanceProcedures } from "../utils/index";

const INVALID_EMAIL = "invalidemail@gmail.com";
const EMAIL = "xitaocrazy@hotmail.com";
const NAME =  "Daniel de Souza Martins";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmllbCBkZSBTb3V6YSBNYXJ0aW5zIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjoiYWRtaW4ifQ.d4DFBAVnQyo_BMLhNn_n2vagocWfHhSW2SBHVI_I-bI";

const cache = setupCache({
  maxAge: 15 * 60 * 1000
});

const API = axios.create({
  baseURL: "http://localhost:3030",
  adapter: cache.adapter
});

const getConfig = (user) => {
  let config = {
    headers: {
      Authorization: `bearer ${user.authtoken}`,
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
      "Access-Control-Allow-Headers":
        "Authorization, Origin, X-Requested-With, Content-Type, Accept"
    }
  };
  return config;
};

const loginUser = async (email, password, setUserOnStorage, setUserLogedIn) => {
  //let config = getConfig({});
  try {
    //const payLoad = `{"email": "${email}","password": "${password}"}`;
    //const { data } = await API.post(`/sessions`, payLoad, config); 
    if (email === INVALID_EMAIL) {
      // eslint-disable-next-line no-throw-literal
      throw "Usuário não cadastrado";
    };
    const data = {      
      user: {
        email: EMAIL,
        name: NAME
      },
      token: TOKEN
    }  ; 
    await setUserOnStorage(data, setUserLogedIn);    
    return true;
  } catch (error) {
    console.log("Erro ao fazer o login: ", error);
    return false;
  }
};

const createNewAsset = async (name, type, description) => {
  //let config = getConfig({});
  try {
    //const payLoad = `{"name": "${name}","type": "${type}","description": "${description}"}`;
    //await API.post(`/assets`, payLoad, config); 
    console.log(`Novo ativo cadastrado. Nome: ${name}, Tipo: ${type}, Descrição: ${description}`);   
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo ativo: ", error);
    return false;
  }
};

const editExistingAsset = async (id, name, type, description) => {
  //let config = getConfig({});
  try {
    //const payLoad = `{"id": "${id}","name": "${name}","type": "${type}","description": "${description}"}`;
    //await API.put(`/assets`, payLoad, config); 
    console.log(`Ativo alterado. ID: ${id}, Nome: ${name}, Tipo: ${type}, Descrição: ${description}`);   
    return true;
  } catch (error) {
    console.log("Erro ao alterar ativo: ", error);
    return false;
  }
};

const getAssets = async (load, user) => {
  //let config = getConfig(user);
  try {
    //const { data } = await API.get("/assets/", config);
    console.log("Buscando lista de ativos");  
    let data = assetsList;
    data.forEach(item => {
      item.selected = false;
    });
    load(data);
    return data;
  } catch (error) {
    console.log("Erro ao buscar os itens da lista: ", error);
    return [];
  }
};

const getAssetById = async (id, user) => {
  //let config = getConfig(user);
  try {
    //const { data } = await API.get(`/assets/${id}`, config);
    console.log(`Buscando ativo por id. Id: ${id}`);
    let data = assetsList.find(a => a._id + '' === id + '');    
    return data;
  } catch (error) {
    console.log("Erro ao buscar os detalhes do ativo: ", error);
    return [];
  }
};

const deleteAsset = async (id, user) => {
  //let config = getConfig(user);
  try {
    //await API.delete(`/assets/${id}`, config);
    console.log(`Ativo removido. ID: ${id}`); 
    return true;
  } catch (error) {
    console.log("Erro ao deletar o ativo: ", error);
    return false;
  }
};

const getAssetMaintenanceProcedures = async (load, assetId, assetType, user) => {
  //let config = getConfig(user);
  try {
    //const { data } = await API.get(`/maintenanceprocedures?assetId=${assetId}&assetType=${assetType}`, config);
    console.log(`Buscando procedimentos de manutenção do ativo. AssetId: ${assetId}, AssetType: ${assetType}`);
    let data = maintenanceProcedures.filter(a => a.assetId + '' === assetId + '' || a.assetType + '' === assetType + '');
    data.forEach(item => {
      item.selected = false;
    });
    load(data);
    return data;
  } catch (error) {
    console.log("Erro ao buscar os procedimentos de manutenção do ativo: ", error);
    return [];
  }
};

const deleteMaintenanceProcedure = async (id, user) => {
  //let config = getConfig(user);
  try {
    //await API.delete(`/assets/${id}`, config);
    console.log(`Procedimento de manutenção removido. ID: ${id}`); 
    return true;
  } catch (error) {
    console.log("Erro ao deletar o procedimento: ", error);
    return false;
  }
};

export {     
  loginUser,
  createNewAsset,
  editExistingAsset,
  getAssets,
  getAssetById,
  deleteAsset,
  getAssetMaintenanceProcedures,
  deleteMaintenanceProcedure
};
