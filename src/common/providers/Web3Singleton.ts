import Web3 from "web3";
import AbiItem from "web3";

export class Web3Singleton {
    private static web3: Web3;

    static getInstance = () => {
        if(Web3Singleton.web3){
            return Web3Singleton.web3
        }
        const Web3 = require("web3")
        Web3Singleton.web3 = new Web3('https://bsc-dataseed1.binance.org:443');
        return Web3Singleton.web3
    }
}
