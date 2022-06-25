import React, { useState, useEffect } from "react";
import Item from "./ItemList";
import { Table, Form, Pagination } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/asset";
import { useSelector } from "react-redux";

const Items = props => {
  const filteredAssets = useSelector(
    ({ asset: { filteredAssets } }) => filteredAssets
  );
  const dispatch = useDispatch();

  const [selectAll, setSelectAll] = useState(false);
  const [activePage, setActivePage] = useState(1);
  const [pages, setPages] = useState([]);
  const [activePageAssets, setActivePageAssets] = useState([]);
  const pageSize = 5;

  useEffect(() => {
    filteredAssets.forEach(item => {
      item.selected = selectAll;
    });
    let items = filteredAssets.filter(e => e);
    dispatch(Actions.updateFilteredAssets(items));
  }, [selectAll]); //eslint-disable-line

  const handlePageChange = (event, page) => {
    event.preventDefault();
    event.stopPropagation();
    setActivePage(page);
  };

  useEffect(() => {
    var items = filteredAssets.length;
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
    var pageAssets = filteredAssets.slice(initial, initial + pageSize);
    setActivePageAssets(pageAssets);
  }, [filteredAssets, activePage]);

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
            <th>Tipo</th>
            <th>Descrição</th>
            <th>Procedimentos</th>
          </tr>
        </thead>
        <tbody style={{ cursor: "pointer" }}>
          {activePageAssets.map((item, idx) => {
            return (
              <Item key={idx} item={item} idx={idx} history={props.history} />
            );
          })}
        </tbody>
      </Table>
      <Pagination>{pages}</Pagination>
    </>
  );
};

export default Items;
