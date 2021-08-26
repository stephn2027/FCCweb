import React from 'react';
import Header from './Header';
import Inventory from './Inventory';
import Order from './Order';
import sampleFishes from '../sample-fishes';
import Fish from './Fish';
import base from '../base';

class App extends React.Component {
  state = {
    fishes: {},
    orders: {},
  };
  componentDidMount(){
      const { params } = this.props.match
      this.ref = base.syncState(`${params.storeId}/fishes`,{
          context: this,
          state: 'fishes',
      });
  }
  //to avoid performance issues by listening for changes in the componentdidmount function evrytime the client changes store,we can use componentwillunmount
 componentWillUnmount(){
  base.removeBinding(this.ref);
 };
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



  loadSampleFishes = (fishes) => {
    this.setState({
      fishes: sampleFishes,
    });
  };

  addToOrder = (key)=>{
      //1. copy the state
      const orders = {...this.state.orders};
      //2. Add the order or update the number of orders
      orders[key] = orders[key] + 1 || 1; 
      //3. update the state object by calling setState
      this.setState({orders,})
  };

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map((key) => (
              <Fish key={key} details={this.state.fishes[key]} index={key} addToOrder={this.addToOrder} />
            ))}
          </ul>
        </div>
        <Order fishes={this.state.fishes} orders={this.state.orders}/>
        <Inventory
          addFish={this.addFish}
          loadSampleFishes={this.loadSampleFishes}
        />
      </div>
    );
  }
}

export default App;
