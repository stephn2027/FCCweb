import React from "react";
import PropTypes from "prop-types";
import {formatPrice} from "../helpers"
class EditFishForm extends React.Component {
  static propTypes = {
    fish: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    updateFish: PropTypes.func,
    index:PropTypes.string,

  };
    handleChange = (event)=>{
        const updatedValue = event.currentTarget.value;
        const updatedName = event.currentTarget.name;
        //update the fish data
        //1. take a copy of the current fish "...this.props.fish" then override the data that's changed "[property name]:changed value"
        const updatedFish = {...this.props.fish, [updatedName]:updatedValue};
        this.props.updateFish(this.props.index,updatedFish);
    }
  render() {

    const { name, price, status, desc, image } = this.props.fish;

    return (
      <div className="fish-edit">
        <input type="text" name="name" onChange={this.handleChange} value={name} />
        <input type="text" name="price" onChange={this.handleChange} value={formatPrice(price)} />
        <select type="text" name="status" onChange={this.handleChange} value={status} >
          <option value="available">Fresh</option>
          <option value="unavailable">Sold Out</option>
        </select>
        <textarea name="desc" onChange={this.handleChange} value={desc}></textarea>
        <input type="text" name="image" onChange={this.handleChange} value={image} />
        <button onClick={()=>this.props.deleteFish(this.props.index)}>Remove Fish</button>

      </div>
    );
  }
}

export default EditFishForm;
