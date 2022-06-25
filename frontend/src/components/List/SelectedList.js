import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SelectedList = props => {

  const [title, setTitle] = useState(props.title);

  const options = props.options.map((elem, idx) => (
    <Dropdown.Item eventKey={elem} key={idx}>
      {elem}
    </Dropdown.Item>
  ));

  const handleChange = value => {
    setTitle(value)
    props.handleChange(value)
  }

  return (
    <Dropdown
      title="Dropdown"
      id={props.title}
      key={props.title}
      onSelect={value => handleChange(value)}
      className={props.classname}
    >
      <Dropdown.Toggle variant="primary">{title}</Dropdown.Toggle>
      <Dropdown.Menu>{options}</Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectedList;
