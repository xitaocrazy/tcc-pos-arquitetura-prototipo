import React from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Creators as Actions } from "../../../store/ducks/asset";
import { useSelector } from "react-redux";
const Item = props => {
  const filteredAssets = useSelector(({ asset: { filteredAssets } }) => filteredAssets);
  const dispatch = useDispatch()

  const setSelected = key => {
    filteredAssets.forEach(item => {
      if (item._id === key) {
        item.selected = !item.selected;
      };
    });
    let items = filteredAssets.filter(e => e);
    dispatch(Actions.updateFilteredAssets(items));
  };

  const handleChange = () => {
    setSelected(props.item._id);
  };

  const goToAssetPage = () => {
    props.history.push(`./details/${props.item._id}`);
  };

  return (
    <tr>
      <th scope="row" style={{ cursor: "pointer" }}>
        <Form.Check
          inline
          type="checkbox"
          value={props.item.selected}
          checked={props.item.selected}
          onChange={() => handleChange()}
        />
      </th>
      <td onClick={goToAssetPage}>{props.item.name}</td>
      <td onClick={goToAssetPage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.type.description}</div>
      </td>
      <td onClick={goToAssetPage} className="" style={{wordBreak: "break-all"}}>
        <div>{props.item.description}</div>
      </td>
    </tr>
  );
};

export default Item;
