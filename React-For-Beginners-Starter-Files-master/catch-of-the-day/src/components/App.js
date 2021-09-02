import React from "react";
import PropTypes from "prop-types";
import Header from "./Header";
import Inventory from "./Inventory";
import Order from "./Order";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from "../base";

class App extends React.Component {
  static propTypes = {
    match: PropTypes.object,
  };

  state = {
    fishes: {},
    orders: {},
  };

  componentDidMount() {
    const { params } = this.props.match;
    //1. reinstate the local storage

    const localStorageRef = localStorage.getItem(params.storeId);
    console.log(localStorageRef);
    if (localStorageRef) {
      this.setState({ orders: JSON.parse(localStorageRef) });
    }
    // one sync issue with firebase and localStorage.getItem is,
    //localStorage will try to get the item but still isnt available since
    //firebase database takes time to sync and load the data. one quick fix for
    //this is to set the component to check if date is available before rendering.

    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes",
    });
  }
  //storing updates localy or through local storage.
  componentDidUpdate() {
    const { params } = this.props.match;
    localStorage.setItem(params.storeId, JSON.stringify(this.state.orders));
  }

  //to avoid performance issues by listening for changes in the componentdidmount function evrytime the client changes store,we can use componentwillunmount
  componentWillUnmount() {
    base.removeBinding(this.ref);
  }
  addFish = (fish) => {
    //steps to update a state
    //1. taking a copy of the existing state to avoid mutation(changing the original state can cause bugs and performance issues);
    const fishes = { ...this.state.fishes };
    //2. Add our new fish to our fishes variable
    fishes[`fish${Date.now()}`] = fish;
    //3. set the new fishes object to the state
    this.setState({
      //ES6 naming feature same as fishes : fishes (as long as variables have the same name)
      fishes,
    });
  };

  updateFish = (key, updatedFish) => {
    //1.take a copy of the current state
    const fishes = { ...this.state.fishes };
    //2.update the state
    fishes[key] = updatedFish;
    //3. set the updated data to state
    this.setState({ fishes });
  };
  deleteFish = (key) => {
    //1. take a copy of the existing state
    const fishes = { ...this.state.fishes };
    //2. update the state
    fishes[key] = null;
    //3. set the updated state to the current state
    this.setState({ fishes });
  };

  removeFromOrder = (key) => {
    const orders = { ...this.state.orders };
    delete orders[key];
    this.setState({ orders });
  };

  loadSampleFishes = (fishes) => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key) => {
    //1. copy the state
    const orders = { ...this.state.orders };
    //2. Add the order or update the number of orders
    orders[key] = orders[key] + 1 || 1;
    //3. update the state object by calling setState
    this.setState({ orders });
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish
                key={key}
                details={this.state.fishes[key]}
                index={key}
                addToOrder={this.addToOrder}
              />
            ))}
          </ul>
        </div>

        <Order
          fishes={this.state.fishes}
          orders={this.state.orders}
          removeFromOrder={this.removeFromOrder}
        />

        <Inventory
          addFish={this.addFish}
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          deleteFish={this.deleteFish}
          storeId = {this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;
