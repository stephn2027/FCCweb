import React from 'react';
import PropTypes from "prop-types";
import {getFunName} from "../helpers";

class StorePicker extends React.Component {
 static propTypes = {
     history:PropTypes.object,
 }
    // constructor(){
    //     super();
    //     this.goToStore = this.goToStore.bind(this);
    // }
     myInput = React.createRef();
     
//"this" cannot be accessed inside a custom method because it has no bindings to the React Component so "this" keyword will equal to undefined;
//use constructor(for 2 or less methods) or declare a property that is set to have an arrow funtion to access "this" in a custom method.
//properties will be bounded to an instance rather than nothing when using a custom method 
    goToStore = (event)=>{
        //prevent submit default
        event.preventDefault();
        
        //getting the text from input
    //    const textInput = this.myInput.current.value;
       const storeName = this.myInput.current.value;
        //change the page to store/user input
        //push state allows us to change a state without refreshing the page.
        console.log(this.props.history.push(`/store/${storeName}`));
    };

    render(){
        return (
        <React.Fragment>
        

        
        <form className="store-selector" onSubmit={this.goToStore}>
            <h2>Please enter a store</h2>
            <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
            <button type="submit" >Visit Store ➢</button>
        </form>
        </React.Fragment>
        )
        
    }
}

export default StorePicker;