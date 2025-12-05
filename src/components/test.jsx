import React, { Component } from "react";
import axios from "axios";

class App1 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userid: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    };
  }
  // methode de gestion des cycle de vie
  componentDidMount() {
    const url = "https://jsonplaceholder.typicode.com/todos/1";
    axios.get(url).then((resp) => this.setState({
      userid: resp.data.userId,
      id: resp.data.id,
      title: resp.data.title,
      completed: resp.data.completed,
    }));
  }
  // render the result
  render() {
    return (
      // desply data on table
      <div>
        <table border="1">
          <tr></tr>
          <th>userId</th>
          <th>id</th>
          <th>title</th>
          <th>completed</th>
          <tr></tr>
          <td>{this.state.userid}</td>
          <td>{this.state.id}</td>
          <td>{this.state.title}</td>
          <td>{this.state.completed.toString()}</td>
        </table>
      </div>
    );
  }
}

export default App1;