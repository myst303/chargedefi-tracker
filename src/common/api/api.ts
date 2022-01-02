import axios, {AxiosRequestConfig} from "axios";

export const postWalletAddress = async(walletAddress: string): Promise<any> => {
    const config: AxiosRequestConfig = {
        baseURL: process.env.REACT_APP_DEV_API_URL,
        method: "post",
        url: "register-address",
        data: {
            wallet_address: walletAddress
        }
    }
    const response = await axios(config);
    return response.data;
}

