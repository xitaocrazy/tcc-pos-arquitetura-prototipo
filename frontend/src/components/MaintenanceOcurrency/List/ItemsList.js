import React, { useState, useEffect } from "react";
import Item from "./ItemList";
import { Table, Form, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/maintenanceOcurrency";
import { useSelector } from "react-redux";

const Items = props => {
  const filteredMaintenanceOcurrency = useSelector(({ MaintenanceOcurrency: { filteredMaintenanceOcurrency } }) => filteredMaintenanceOcurrency);
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [activePageMaintenanceOcurrency, setActivePageMaintenanceOcurrency] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    filteredMaintenanceOcurrency.forEach(item => {
      if (!item.realizedAt){
        item.selected = selectAll;
      } else {
        item.selected = false;
      }      
    });
    let items = filteredMaintenanceOcurrency.filter(e => e);
    dispatch(Actions.updateFilteredMaintenanceOcurrency(items));
  }, [selectAll]);//eslint-disable-line

  const handlePageChange = (event, page) => {
    event.preventDefault();
    event.stopPropagation();
    setActivePage(page);
  };

  useEffect(() => {
    var items = filteredMaintenanceOcurrency.length;
    if (items <= pageSize) setActivePage(1);
    var pages = [];
    var quotient = Math.trunc(items / pageSize);
    var remainder = items % pageSize;
    var totalPages = quotient + (remainder > 0 ? 1 : 0);
    for (let number = 1; number <= totalPages; number++) {
      pages.push(
        <Pagination.Item
          onClick={e => handlePageChange(e, number)}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }
    setPages(pages);
    var initial = (activePage - 1) * pageSize;
    var pageAssets = filteredMaintenanceOcurrency.slice(initial, initial + pageSize);
    setActivePageMaintenanceOcurrency(pageAssets);
  }, [filteredMaintenanceOcurrency, activePage]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>
              <Form.Check
                value={selectAll}
                checked={selectAll}
                onChange={e => setSelectAll(e.target.checked)}
              />
            </th>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Agendado para</th>            
            <th>Realizado em</th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {activePageMaintenanceOcurrency.map((item, idx) => {
            return (
              <Item key={idx} item={item} idx={idx} history={props.history}/>
            );
          })}
        </tbody>
      </Table>
      <Pagination>{pages}</Pagination>
    </>
  );
};

export default Items;
