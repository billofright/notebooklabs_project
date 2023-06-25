import { Network, Alchemy } from "alchemy-sdk"

export const fetchData = async (contractAddress, topics, increment) => {
    const settings = {
        apiKey: process.env.REACT_APP_API_KEY,
        network: Network.ARB_MAINNET,
    };

    const alchemy = new Alchemy(settings);
    const latestBlock = await alchemy.core.getBlockNumber();
    const fromBlock = latestBlock - increment;

    const response = alchemy.core.getLogs({
        address: contractAddress,
        topics: [topics],
        fromBlock: `0x${fromBlock.toString(16)}`,
        toBlock: `0x${latestBlock.toString(16)}`,
    })

    return response;
}

