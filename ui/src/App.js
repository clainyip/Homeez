import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

const apiUrl = `http://localhost:8080`;

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      infos: [],
      input: ''
    };

    this.onchange = this.onchange.bind(this);
  }

  async createInfo() {
    await axios.post(apiUrl + '/info', {
      tableInfo: this.state.input,
    });
    this.loadInfos();
  }

  async loadInfos() {
    const res = await axios.get(apiUrl + '/info');
    this.setState({
      infos: res.data
    });
  }

  async deleteInfo() {
    const res = await axios.delete(apiUrl + '/info');
    this.loadInfos();
  }

  async deleteInfoById(id) {
    const res = await axios.delete(apiUrl + '/info/' + id);
    this.loadInfos();
  }

  componentDidMount() {
    this.loadInfos();
  }

  onchange(e) {
    this.setState({
      input: e.target.value
    });
  }

  genTable() {
    return <table>
            <tr>
              <td>ID</td>
              <td>Table Info</td>
              <td>Table Valid</td>
              <td>Delete Button</td>
            </tr>
            {this.state.infos.map(info => (
              <tr>
                <td>{info.xid}</td>
                <td>{info.table_info}</td>
                <td>{String(info.table_valid)}</td>
                <td>
                  <button class="btn btn-light" onClick={() => this.deleteInfoById(info._id)}>Delete Info</button>
                </td>
              </tr>
            ))}
          </table>
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input id="tableInfo" onChange={this.onchange}></input>
          <button class="btn btn-light" onClick={() => this.createInfo()}>Create Info</button>
          <button class="btn btn-info" onClick={() => this.deleteInfo()}>Delete All Info</button>
          <p>Information list:</p>
          {this.genTable()}
        </header>
      </div>
    );
  }
}

export default App;
