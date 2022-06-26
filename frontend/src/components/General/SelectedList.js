import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";

const SelectedList = props => {

  const [title, setTitle] = useState(props.title);

  const options = props.options.map((elem, idx) => (
    <Dropdown.Item eventKey={elem.Value} key={idx}>
      {elem.Description}
    </Dropdown.Item>
  ));

  const handleChange = value => {
    var elem = props.options.filter(option => option.Value === value)[0];
    setTitle(elem.Description)
    props.handleChange(elem.Value)
  }

  return (
    <Dropdown
      title="Dropdown"
      id={props.title}
      key={props.title}
      onSelect={value => handleChange(value)}
      className={props.classname}
    >
      <Dropdown.Toggle variant="secondary">{title}</Dropdown.Toggle>
      <Dropdown.Menu>{options}</Dropdown.Menu>
    </Dropdown>
  );
};

export default SelectedList;
