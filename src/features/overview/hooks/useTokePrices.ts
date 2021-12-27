import {useEffect, useState} from "react";
import CoinGecko from "coingecko-api";

export const useTokenPrices = () => {
    const [coins, setCoins] = useState<Array<any>>([])

    const getTokenPrice = async () => {
        const client = new CoinGecko()
        const staticCoin = await client.coins.fetch("chargedefi-static", {})
        const chargeCoin = await client.coins.fetch("chargedefi-charge", {})
        const lpPrice = await fetch("https://api.beefy.finance/lps", {method: "GET"})
            .then(r => r.json())
            .then(r => r["charge-static-busd"])
        setCoins([
            {
                price: staticCoin.data.tickers[0].last.toFixed(3),
                name: "Static",
                icon: "https://www.chargedefi.fi/static/media/static.180ec003.png"
            },
            {
                price: staticCoin.data.tickers[0].last.toFixed(3),
                name: "Pulse",
                icon: "https://www.chargedefi.fi/static/media/pulse.d06a42ec.png"
            },
            {
                price: chargeCoin.data.tickers[0].last.toFixed(3),
                name: "Charge",
                icon: "https://www.chargedefi.fi/static/media/charge.53089c19.png"
            },
            {
                price: lpPrice,
                name: "Static-BUSD LP"
            }
        ])
    }

    useEffect(() => {
        getTokenPrice()
    }, [])

    return {
        coins
    }
}
