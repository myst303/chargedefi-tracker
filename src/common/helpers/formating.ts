


export const formatWalletAddr = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(addr.length-4)}`
}

export const formatUS = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'decimal', currency: 'USD' }).format(value)
}
