import axios from "axios";
import { setupCache } from "axios-cache-adapter";

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

const createNewUser = async (name, email, password) => {
  //let config = getConfig({});
  try {
    //const payLoad = `{"name": "${name}","email": "${email}","password": "${password}"}`;
    //await API.post(`/users`, payLoad, config);
    if (email === INVALID_EMAIL) {
      // eslint-disable-next-line no-throw-literal
      throw "Usuário inválido";
    };
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo usuário: ", error);
    return false;
  }
};

const getUserById = async (id, user) => {
  //let config = getConfig(user);
  try {
    //const { data } = await API.get(`/users/${id}/detail`, config);
    //return data;
    if (id === 12345){
      return {
        email: EMAIL,
        name: NAME,
        token: TOKEN
      }
    };
    // eslint-disable-next-line no-throw-literal
    throw "Usuário não encontrado";
  } catch (error) {
    console.log("Erro ao buscar os detalhes do usuario: ", error);
    return [];
  }
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

const getAssets = async (load, user) => {
  //let config = getConfig(user);
  try {
    //const { data } = await API.get("/logs/", config);
    const data = [
      {
        _id: 1,
        name: "Ativo 1",
        type: {
          id: 1,
          description: "Alimentador Vibratório"
        },
        description: "BR AV 25 050 Cap. alimentação 10 a 80 m³/h mototr 1 x 5 CV",
        maintenanceProcedures: 3
      },
      {
        _id: 2,
        name: "Ativo 2",
        type: {
          id: 1,
          description: "Britador de Mandíbula"
        },
        description: "BR 5030. Cap. alimentação 12 a 15 m³/h 30CV",
        maintenanceProcedures: 5
      }
    ];
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
    //const { data } = await API.get(`/logs/${id}`, config);
    const data = {
      description: {
        title: "Isso é um exemplo",
        stacktrace: "Não tem"
      },
      lastOccurrence: {
        date: new Date(),
        user: "xitaocrazy"
      },
      origin: "development",
      occurrences: 0,
      level: "",
      selected: true,
      _id: 1,
      environment: "development"
    };
    return data;
  } catch (error) {
    console.log("Erro ao buscar os detalhes do erro: ", error);
    return [];
  }
};

const deleteAsset = async (id, remove, user) => {
  //let config = getConfig(user);
  try {
    //await API.delete(`/logs/${id}`, config);
    remove(id);
    return true;
  } catch (error) {
    console.log("Erro ao deletar o erro: ", error);
    return false;
  }
};

const archiveAsset = async (id, archive, user) => {
  //let config = getConfig(user);
  try {
    //await API.put(`/logs/${id}/archive`, [], config);
    //archive(id);
    return true;
  } catch (error) {
    console.log("Erro ao arquivar o erro: ", error);
    return false;
  }
};

export {     
  createNewUser,
  getUserById,
  loginUser,
  getAssets,
  getAssetById,
  deleteAsset,
  archiveAsset, 
};
