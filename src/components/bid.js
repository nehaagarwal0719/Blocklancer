import React, { Component } from 'react';
import './App.css';
import Web3 from 'web3';
import freelancer from '../abis/freelancer.json';

class bid extends Component{

async componentWillMount(){
  await this.loadweb3()
  console.log(window.web3)
  await this.loadBlockchainData()
}



async loadweb3(){
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }


  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts()
    this.setState({account: accounts[0]})
    const networkId = await web3.eth.net.getId()
    const networkData = freelancer.networks[networkId]
    if(networkData){ 
     const Freelancer = web3.eth.Contract(freelancer.abi,networkData.address)
     this.setState({Freelancer})
     const bidCount = await Freelancer.methods.bidCount().call()
     //console.log(productCount.toString())
     this.setState({bidCount})
     for(var i=1;i<=bidCount;i++){
      const bid = await Freelancer.methods.bids(i).call()
      this.setState({
        bids:[...this.state.bids,bid]
      })      
     }


     this.setState({loading:false})
     console.log(this.state.bids)
      }
    else{
    window.alert("Contract not deployed to the detected network");
  }
}


  constructor (props){
    super(props)
    this.state ={
      account: '',
      bidCount:0,
      bids:[],
      loading : true
    }
   this.createBid = this.createBid.bind(this);
  //this.purchaseProduct = this.purchaseProduct.bind(this)
  }
createBid(name,message,time,price) {
    this.setState({ loading: true })
    this.state.Freelancer.methods.createBid(name,message,time,price).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
    })
  }
	render()
	{
    return(
 		
 		<div id="content">
            <form onSubmit={(event) => {
          			event.preventDefault()
         			  const name = this.bidderName.value
         			  const des  = this.bidderDes.value
         			  const time = this.bidderTime.value
         			  const price = this.bidderPrice.value
          			  this.props.createbid(name,des,time,price)
             }}>
                  <div className="form-group mr-sm-2">
                     <input
                        id="bidderName"
                        type="text"
                        ref={(input) => { this.bidderName = input }}
                        className="form-control"
                        placeholder="Bidder Name"
                        required />
                        <input
                        id="bidderDes"
                        type="text"
                        ref={(input) => { this.bidderDes = input }}
                        className="form-control"
                        placeholder="Bidder Description"
                        required />
                        <input
                        id="bidderTime"
                        type="text"
                        ref={(input) => { this.bidderTime = input }}
                        className="form-control"
                        placeholder="Bidder Time"
                        required />
                        <input
                        id="bidderPrice"
                        type="text"
                        ref={(input) => { this.bidderPrice = input }}
                        className="form-control"
                        placeholder="Bidder Price"
                        required />
                  </div>          
                  <button type="submit" className="btn btn-primary">Bid</button>
            </form>
            <p>&nbsp;</p>
            <h2>Bid List</h2>
            <table className="table">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Description</th>
                    <th scope="col">Time</th>
                    <th scope="col">Price</th>
                    <th scope="col">Owner</th>
                   </tr>
                </thead>

          </table>
          createBid={this.createBid}
			</div>
    	);
	}
}

export default bid;
