import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceHistory";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, FormControl, Form } from "react-bootstrap";

const SearchForm = () => {

  const allMaintenanceHistory = useSelector(({ maintenanceHistory: { allMaintenanceHistory } }) => allMaintenanceHistory);
  const dispatch = useDispatch(); 
  
  const [filtro, setFiltro] = useState("");

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      items = allMaintenanceHistory.filter(item => {
        return (
          (item.maintenanceProcedure.scheduledTo.match(pattern)) ||
          (item.maintenanceProcedure.realizedAt.match(pattern)) ||
          (item.maintenanceProcedure.description.match(pattern))
        );
      });
      dispatch(Actions.updateFilteredMaintenanceHistory(items));
    } else {
      dispatch(Actions.updateFilteredMaintenanceHistory(allMaintenanceHistory));
    }
  };

  const handleSubmit = (event, filter) => {
    event.preventDefault();
    event.stopPropagation();
    applyFilter(filter);
  };

  const handleChange = event => {
    event.preventDefault();
    setFiltro(event.target.value);
  };

  return (
    <div className="d-flex flex-row">
      <Form noValidate onSubmit={(e) => handleSubmit(e, filtro)}>
        <FormControl
          placeholder="Filtrar por..."
          value={filtro}
          onChange={handleChange}
        />
      </Form>
      <Button variant="light" className="ml-1" onClick={(e) => handleSubmit(e, filtro)}>
        <FontAwesomeIcon icon={faSearch} />
      </Button>
    </div>
  );
};

export default SearchForm;
