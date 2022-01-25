const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const { interface, bytecode } = require('./compile');

const provider = new HDWalletProvider(
    'genius motion grant struggle city eight custom dog alone hurdle area issue',
    'https://rinkeby.infura.io/v3/d09d6b0348b1445f9543d5a0f63ef7f2'
);

const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log('Attempting to deploy from accounts', accounts[0]);

    const result = await new web3.eth.Contract(JSON.parse(interface))
      .deploy({ 
          data: bytecode,
        arguments: ['Hi there'] })
      .send({
          gas: '1000000',
          from: accounts[0]
      });
    
    console.log('Contract deployed to', result.options.address);

    provider.engine.stop();

};
deploy();