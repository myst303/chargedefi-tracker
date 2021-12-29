import {useWalletAddress} from "../../common/contexts/WalletAddressContext";
import farmsContract from "../contracts/farms.json";
import staticBusdLpContract from "../contracts/static-busd-lp.json"
import {staticFarmAddress, chargeFarmAddress, staticBusdLpAddress} from "../../common/helpers/consts";
import {useEffect, useState} from "react";
import {fromWei, toBN} from "../../common/helpers/web3-helpers";
import {useTokenPrices} from "../../common/contexts/TokenPricesContext";


const Web3 = require("web3")
const web3 = new Web3('https://bsc-dataseed1.binance.org:443');

export const useFarms = () => {
    const {walletAddress} = useWalletAddress()!
    const { tokens } = useTokenPrices()!
    const chargeFarmC = new web3.eth.Contract(farmsContract, chargeFarmAddress, {from: walletAddress})
    const staticFarmC = new web3.eth.Contract(farmsContract, staticFarmAddress, {from: walletAddress})
    const staticBusdLpC = new web3.eth.Contract(staticBusdLpContract, staticBusdLpAddress, {from: walletAddress})

    const [staticBusd, setStaticBusd] = useState<any>({})
    const [chargeBusd, setChargeBusd] = useState<any>({})

    const get = async() => {
        try {
            const staticLpAmount = await staticFarmC.methods.userInfo(0, walletAddress).call()
            const chargeLpAmount = await chargeFarmC.methods.userInfo(0, walletAddress).call()
            const staticPoolReward = fromWei(await staticFarmC.methods.pendingReward(walletAddress, 0).call())
            const chargePoolReward = fromWei(await chargeFarmC.methods.pendingReward(walletAddress, 0).call())

            setStaticBusd({
                lp: fromWei(staticLpAmount.amount),
                value: tokens.staticLp * fromWei(staticLpAmount.amount),
                chargeReward: staticPoolReward,
                chargeValue: staticPoolReward * tokens.chargePrice
            })

            setChargeBusd({
                lp: fromWei(chargeLpAmount.amount),
                value: tokens.chargeLp * fromWei(chargeLpAmount.amount),
                chargeReward: chargePoolReward,
                chargeValue: chargePoolReward * tokens.chargePrice
            })
        } catch (e) {
            console.log(e)
        }

        // const tvl = await staticFarmC.methods.TVL(0).call()
        // const supply = await staticBusdLpC.methods.totalSupply().call()
    }


    useEffect(() => {
        get()
    },[])

    return {
        staticBusd, chargeBusd
    }
}
