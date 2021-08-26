import React from "react";
// stateless functional component - if the component only has a render method.

const Header = (props) => (
  //implicit return: no need to add the return keyword if we will just return a same line. arrow function does the return for us.
  <header className="top">
    <h1>
      Catch
      <span className="ofThe">
        <span className="of">of</span>
        <span className="the">the</span>
      </span>
      Day
    </h1>
    <h3 className="tagline">
      <span>{props.tagline}</span>
    </h3>
  </header>
);

// class Header extends React.Component {
//   render() {
//     return (
//       <React.Fragment>
//         <header className="top">
//           <h1>
//             Catch
//             <span className="ofThe">
//               <span className="of">of</span>
//               <span className="the">the</span>
//             </span>
//             Day
//           </h1>
//           <h3 className="tagline">
//             <span>{this.props.tagline}</span>
//           </h3>
//         </header>
//       </React.Fragment>
//     );
//   }
// }

export default Header;
