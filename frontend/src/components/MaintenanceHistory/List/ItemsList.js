import React, { useState, useEffect } from "react";
import Item from "./ItemList";
import { Table, Pagination } from "react-bootstrap";
import { useSelector } from "react-redux";

const Items = props => {
  const filteredMaintenanceHistory = useSelector(({ maintenanceHistory: { filteredMaintenanceHistory } }) => filteredMaintenanceHistory);

  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [activePageMaintenanceHistory, setActivePageMaintenanceHistory] = useState([]);
  const pageSize = 5;

  const handlePageChange = (event, page) => {
    event.preventDefault();
    event.stopPropagation();
    setActivePage(page);
  };

  useEffect(() => {
    var items = filteredMaintenanceHistory.length;
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
    var pageAssets = filteredMaintenanceHistory.slice(initial, initial + pageSize);
    setActivePageMaintenanceHistory(pageAssets);
  }, [filteredMaintenanceHistory, activePage]);

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Descrição</th>
            <th>Agendado para</th>            
            <th>Realizado em</th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {activePageMaintenanceHistory.map((item, idx) => {
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
