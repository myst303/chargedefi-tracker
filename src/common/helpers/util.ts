


export const interval30 = (fn: any) => {
    setInterval(() => fn(), 5000)
}

export const getTokenUrl = (token: string) => {
    switch (token){
        case "charge":
            return "https://www.chargedefi.fi/static/media/charge.53089c19.png"
        case "static":
            return "https://www.chargedefi.fi/static/media/static.180ec003.png"
        case "pulse":
            return "https://www.chargedefi.fi/static/media/pulse.d06a42ec.png"
        case "static-busd":
            return "https://www.chargedefi.fi/static/media/static-busd.00622597.png"
        case "charge-busd":
            return "https://www.chargedefi.fi/static/media/charge-busd.fffca344.png"
    }
}
