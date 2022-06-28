export const formatDate = dateString => {
  if (!dateString){
    return "";
  }
  const date = dateString && new Date(dateString);
  const day =
    date &&
    date
      .getDate()
      .toString()
      .padStart(2, "0");
  const month = date && (date.getMonth() + 1).toString().padStart(2, "0");
  const hour =
    date &&
    date
      .getHours()
      .toString()
      .padStart(2, "0");
  const minute =
    date &&
    date
      .getMinutes()
      .toString()
      .padStart(2, "0");
  return `${day}/${month}/${date && date.getFullYear()} ${hour}:${minute}`;
};

export const assetTypes = [
  {
    Description: "Alimentador Vibratório",
    Value: "1"
  },
  {
    Description: "Britador de Mandíbula",
    Value: "2"
  }
];

export const assetsList = [
  {
    _id: 1,
    name: "Ativo 1",
    type: {
      id: 1,
      description: "Alimentador Vibratório"
    },
    description: "BR AV 25 050 Cap. alimentação 10 a 80 m³/h mototr 1 x 5 CV",   
  },
  {
    _id: 2,
    name: "Ativo 2",
    type: {
      id: 2,
      description: "Britador de Mandíbula"
    },
    description: "BR 5030. Cap. alimentação 12 a 15 m³/h 30CV"
  }
];

export const recurrencyTypes = [
  {
    Description: "Não recorrente",
    Value: "1"
  },
  {
    Description: "Quinzenal",
    Value: "2"
  },
  {
    Description: "Mensal",
    Value: "3"
  }
];

//1-Não recorrente, 2-Quinzenal, 3-Mensal
export const maintenanceProcedures = [
  {
    _id: 1,
    name: "Revisão periódica",
    assetType: 1,
    assetId: null,
    description: "Revisão periódica de manutenção preventida",
    recurrency: {
      type: 2,
      description: "Quinzenal"
    }
  },
  {
    _id: 2,
    name: "Manutenção corretiva",
    assetType: null,
    assetId: 1,
    description: "Revisão para reparo de peças e calibragem",
    recurrency: {
      type: 1,
      description: "Não recorrente"
    }
  },
  {
    _id: 3,
    name: "Revisão periódica",
    assetType: 2,
    assetId: null,
    description: "Revisão periódica de manutenção preventida",
    recurrency: {
      type: 2,
      description: "Quinzenal"
    }
  }
];

export const MaintenanceOcurrency = [
  {
    _id: 1,
    scheduledTo: "2022-04-23T18:00:00",
    realizedAt: "2022-04-23T18:00:00",
    assetId: 1,
    maintenanceProcedure: maintenanceProcedures.find(m => m._id === 1)
  },
  {
    _id: 2,
    scheduledTo: "2022-07-23T18:00:00",
    realizedAt: null,
    assetId: 1,
    maintenanceProcedure: maintenanceProcedures.find(m => m._id === 2)
  },
  {
    _id: 3,
    scheduledTo: "2022-04-23T18:00:00",
    realizedAt: "2022-04-23T18:00:00",
    assetId: 2,
    maintenanceProcedure: maintenanceProcedures.find(m => m._id === 3)
  }
];