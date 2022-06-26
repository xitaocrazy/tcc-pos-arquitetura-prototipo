export const formatDate = dateString => {
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
    maintenanceProcedures: {
      count: 2,
      items: [
        {
          type: 1,
          last: "2022-06-01'T'14:00:00",
          next: "2022-06-15'T'14:00:00"
        },
        {
          type: 1,
          last: "2022-06-04'T'14:00:00",
          next: undefined
        }
      ]
    }    
  },
  {
    _id: 2,
    name: "Ativo 2",
    type: {
      id: 2,
      description: "Britador de Mandíbula"
    },
    description: "BR 5030. Cap. alimentação 12 a 15 m³/h 30CV",
    maintenanceProcedures: {
      count: 1,
      items: [
        {
          type: 3,
          last: "2022-06-01'T'14:00:00",
          next: "2022-06-15'T'14:00:00"
        }
      ]
    }
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