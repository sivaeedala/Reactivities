import React, { Component } from "react";
import "./App.css";
import axios from "axios";
import { Header, Icon, List } from "semantic-ui-react";
// import { Cars } from './demo';
// import { CarItem } from './CarItem';

// const App: React.FC = () => {
//   return (
//     <div className="App">
//      {/* {
//        Cars.map(c=>{return <CarItem car={c}></CarItem>})
//      } */}
//     </div>
//   );
// }

export default class App extends Component {
  state = {
    Values: []
  };

  componentDidMount() {
    axios.get("http://localhost:5000/api/values").then(response => {
      this.setState({
        Values: response.data
      });
    });
  }
  render() {
    return (
      <div>
        <Header as="h2">
          <Icon name="users" />
          <Header.Content>Reactivities</Header.Content>
        </Header>
        <List>
          {this.state.Values.map((v: any) => {
            return <List.Item key={v.id}>{v.name}</List.Item>;
          })}
        </List>
      </div>
    );
  }
}

// export default App;
