import { assetsList, maintenanceProcedures, MaintenanceOcurrency } from "../utils/index";

const EMAIL = "valid@email.com";
const SENHA = "123456";
const NAME =  "Daniel de Souza Martins";
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkRhbmllbCBkZSBTb3V6YSBNYXJ0aW5zIiwiaWF0IjoxNTE2MjM5MDIyLCJwcm9maWxlIjoiYWRtaW4ifQ.d4DFBAVnQyo_BMLhNn_n2vagocWfHhSW2SBHVI_I-bI";


const loginUser = async (email, password, setUserOnStorage, setUserLogedIn) => {
  try {
    if (email !== EMAIL || password !== SENHA) {
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

const createNewAsset = async (name, type, description, user) => {
  try {
    console.log(`Novo ativo cadastrado. Nome: ${name}, Tipo: ${type}, Descrição: ${description}`);   
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo ativo: ", error);
    return false;
  }
};

const editExistingAsset = async (id, name, type, description) => {
  try {
    console.log(`Ativo alterado. ID: ${id}, Nome: ${name}, Tipo: ${type}, Descrição: ${description}`);   
    return true;
  } catch (error) {
    console.log("Erro ao alterar ativo: ", error);
    return false;
  }
};

const getAssets = async (load, user) => {
  try {
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
  try {
    console.log(`Buscando ativo por id. Id: ${id}`);
    let data = assetsList.find(a => a._id + '' === id + '');    
    return data;
  } catch (error) {
    console.log("Erro ao buscar os detalhes do ativo: ", error);
    return [];
  }
};

const deleteAsset = async (id, user) => {
  try {
    console.log(`Ativo removido. ID: ${id}`); 
    return true;
  } catch (error) {
    console.log("Erro ao deletar o ativo: ", error);
    return false;
  }
};

const createNewMaintenanceProcedure = async (name, description, assetType, assetId, reccurencyId, user) => {
  try {
    console.log(`Novo procedimento de manutenção cadastrado. Nome: ${name}, Descrição: ${description}, Tipo de Ativo: ${assetType}, Id do Ativo: ${assetId}, Recorrência: ${reccurencyId}`);   
    return true;
  } catch (error) {
    console.log("Erro ao cadastrar novo procedimento de manutenção: ", error);
    return false;
  }
};

const getMaintenanceProcedures = async (load, assetId, assetType, user) => {
  try {
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
  try {
    console.log(`Procedimento de manutenção removido. ID: ${id}`); 
    return true;
  } catch (error) {
    console.log("Erro ao deletar o procedimento de manutenção: ", error);
    return false;
  }
};

const createNewMaintenanceOcurrency = async (assetId, scheduledTo, maintenanceProcedureId) => {
  try {
    console.log(`Novo procedimento de manutenção agendado. Id do Ativo: ${assetId}, Agendado para: ${scheduledTo}, Id do Procedimento: ${maintenanceProcedureId}`);   
    return true;
  } catch (error) {
    console.log("Erro ao agendar novo procedimento de manutenção: ", error);
    return false;
  }
};

const getMaintenanceOcurrency = async (load, assetId, user) => {
  try {
    console.log(`Buscando histórico de procedimentos de manutenção do ativo. AssetId: ${assetId}`);
    let data = MaintenanceOcurrency.filter(a => a.assetId + '' === assetId + '');
    data.forEach(item => {
      item.selected = false;
    });
    load(data);
    return data;
  } catch (error) {
    console.log("Erro ao buscar histórico dos procedimentos de manutenção do ativo: ", error);
    return [];
  }
};

const deleteMaintenanceOcurrency = async (id, user) => {
  try {
    console.log(`Manutenção agendada removida. ID: ${id}`); 
    return true;
  } catch (error) {
    console.log("Erro ao deletar o manutenção agendada: ", error);
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
  createNewMaintenanceProcedure,
  getMaintenanceProcedures,
  deleteMaintenanceProcedure,
  createNewMaintenanceOcurrency,
  getMaintenanceOcurrency,
  deleteMaintenanceOcurrency
};
