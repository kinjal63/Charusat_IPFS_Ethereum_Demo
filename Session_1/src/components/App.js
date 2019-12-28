import React, { Component } from 'react';
import logo from '../logo.png';
import './App.css';
import web3 from 'web3';
import Meme from '../abis/Meme.json';

const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      buffer: null,
      contract: null,
      account: null,
      memeHash: null,
      url: null
    };
  }

  componentWillMount() {
    this.loadWeb3();
    this.loadBlockchainData();
  }

  async loadWeb3() {
    if(window.ethereum) {
      window.web3 = new web3(window.ethereum);
      await window.ethereum.enable();
    }
    if(window.web3) {
      window.web3 = new web3(window.web3.currentProvider);
    }
    else {
      window.alert('please use metamask to use this app');
    }
  }

  //Get account address
  //Get Network Id
  //Get Contract and store hash
  async loadBlockchainData() {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    
    const networkDetails = Meme.networks[networkId];
    const contract = new web3.eth.Contract(Meme.abi, networkDetails.address);
    
    this.setState({account: accounts[0]});
    this.setState({contract});
  }

  captureFile = (event) => {
    event.preventDefault();
    const file = event.target.files[0];

    const reader = new window.FileReader();
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      this.setState({'buffer':  new Buffer(reader.result)});
    }
  }

  onSubmit = (event) => {
    event.preventDefault();

    ipfs.add(this.state.buffer, (error, result) => {
      if(error) {
        console.error(error);
        return;
      }
      this.setState({url: 'https://ipfs.infura.io/ipfs/' + result[0].hash});
      
      this.state.contract.methods.set(result[0].hash).send({from: this.state.account}).then((result) => {
        this.setState({memeHash: result[0].hash});
      })
    })
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img src={this.state.url} className="App-logo" />
                </a>
                <h1>{this.state.name}</h1>
                
                <br></br>
                <br></br>
                <form onSubmit={this.onSubmit}>
                  <input type='file' onChange={this.captureFile} />
                  <input type="submit" value="Submit" />
                </form>

              </div>
            </main>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
