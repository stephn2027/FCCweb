import React from "react";
import PropTypes from "prop-types";
import { formatPrice } from "../helpers";

class Fish extends React.Component {
  //putting static means every instance of the Fish component has the same proptypes. no need to duplicate the proptypes
  static propTypes = {
    details: PropTypes.shape({
      image: PropTypes.string,
      name: PropTypes.string,
      desc: PropTypes.string,
      status: PropTypes.string,
      price: PropTypes.number,
    }),
    addToOrder: PropTypes.func,
  };
  render() {
    const { image, name, price, status, desc } = this.props.details;
    const isAvailable = status === "available";
    return (
      <li className="menu-fish">
        <img src={image} alt={name} />
        <h3 className="fish-name">
          {name}
          <span className="price">{formatPrice(price)}</span>
        </h3>
        <p>{desc}</p>
        <button
          disabled={!isAvailable}
          onClick={() => this.props.addToOrder(this.props.index)}
        >
          {isAvailable ? "Add to Cart" : "Sold Out!"}
        </button>
      </li>
    );
  }
}

export default Fish;
