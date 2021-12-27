
const Web3 = require("web3")
const web3 = new Web3(Web3.givenProvider)

export const fromWei = (value: string|number) => {
    return web3.utils.fromWei(value)
}

export const toBN = (value: string | number) => {
    return web3.utils.toBN(value)
}

export const isAddress = (value: string) => {
    return web3.utils.isAddress(value)
}
