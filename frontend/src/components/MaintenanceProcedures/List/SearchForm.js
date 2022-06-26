import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceProcedure";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Button, FormControl, Form } from "react-bootstrap";

const SearchForm = () => {

  const allMaintenanceProcedures = useSelector(({ maintenanceProcedure: { allMaintenanceProcedures } }) => allMaintenanceProcedures);
  const dispatch = useDispatch(); 
  
  const [filtro, setFiltro] = useState("");

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      items = allMaintenanceProcedures.filter(item => {
        return (
          (item.name.match(pattern)) ||
          (item.description.match(pattern))
        );
      });
      dispatch(Actions.updateFilteredMaintenanceProcedures(items));
    } else {
      dispatch(Actions.updateFilteredMaintenanceProcedures(allMaintenanceProcedures));
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
