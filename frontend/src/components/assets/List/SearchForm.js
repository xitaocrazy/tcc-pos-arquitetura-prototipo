import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/asset";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import SelectedList from "./SelectedList";
import {
  Button,
  FormControl,
  Form
} from "react-bootstrap";

const SearchForm = () => {

  const allAssets = useSelector(({ asset: { allAssets } }) => allAssets);
  const dispatch = useDispatch(); 
  
  const [filtro, setFiltro] = useState("");
  const [searchBy, setSearchBy] = useState("");

  const changeSearchBy = searchBy => setSearchBy(searchBy);

  const applyFilter = filter => {
    let items = []
    if (filter) {
      const pattern = new RegExp(filter.trim(), "i");
      switch (searchBy) {
        case "Nome":
          items = allAssets.filter(item => item.name.match(pattern));
          break;
        case "Descrição":
          items = allAssets.filter(item => item.description.match(pattern));
          break;
        case "Tipo":
          items = allAssets.filter(item => item.type && item.type.description.match(pattern));
          break;
        default:
          items = allAssets.filter(item => {
            return (
              (item.name.match(pattern)) ||
              (item.description.match(pattern)) ||
              (item.type && item.type.description.match(pattern))
            );
          });
      }
      dispatch(Actions.updateFilteredAssets(items));
    } else {
      dispatch(Actions.updateFilteredAssets(allAssets));
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
      <SelectedList
        title="Buscar"
        options={["Todos", "Nome", "Tipo", "Descrição"]}
        handleChange={changeSearchBy}
        classname="p2 pr-1"
      />
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
