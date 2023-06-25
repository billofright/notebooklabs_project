import Web3 from 'web3';
const web3 = new Web3();

// stores the hex strings for each desired event topic
export const topics = {
  '0xab4c77c74cd32c85f35416cf03e7ce9e2d4387f7b7f2c1f4bf53daaecf8ea72d': 'BuyUSDG',
  '0xd732b7828fa6cee72c285eac756fc66a7477e3dc22e22e7c432f1c265d40b483': 'SellUSDG',
  '0x0874b2d545cb271cdbda4e093020c452328b24af12382ed62c4d00f5c26709db': 'Swap',
  '0x2fe68525253654c21998f35787a8d0f361905ef647c854092430ab65f2f15022': 'IncreasePosition',
  '0x93d75d64d1f84fc6f430a64fc578bdd4c1e090e90ea2d51773e626d19de56d30': 'DecreasePosition',
  '0x2e1f85a64a2f22cf2f0c42584e7c919ed4abe8d53675cff0f62bf1e95a1c676f': 'LiquidatePosition',
  '0x25e8a331a7394a9f09862048843323b00bdbada258f524f5ce624a45bf00aabb': 'UpdatePosition',
  '0x73af1d417d82c240fdb6d319b34ad884487c6bf2845d98980cc52ad9171cb455': 'ClosePosition',
  '0xa146fc154e1913322e9817d49f0d5c37466c24326e15de10e739a948be815eab': 'UpdateFundingRate',
  '0x3ff41bdde87755b687ae83d0221a232b6be51a803330ed9661c1b5d0105e0d8a': 'UpdatePnl',
  '0x47cd9dda0e50ce30bcaaacd0488452b596221c07ac402a581cfae4d3933cac2b': 'CollectSwapFees',
  '0x5d0c0019d3d45fadeb74eff9d2c9924d146d000ac6bcf3c28bf0ac3c9baa011a': 'CollectMarginFees',
  '0xa5a389190ebf6170a133bda5c769b77f4d6715b8aa172ec0ddf8473d0b4944bd': 'DirectPoolDeposit',
  '0x976177fbe09a15e5e43f848844963a42b41ef919ef17ff21a17a5421de8f4737': 'IncreasePoolAmount',
  '0x112726233fbeaeed0f5b1dba5cb0b2b81883dee49fb35ff99fd98ed9f6d31eb0': 'DecreasePoolAmount',
  '0x64243679a443432e2293343b77d411ff6144370404618f00ca0d2025d9ca9882': 'IncreaseUsdgAmount',
  '0xe1e812596aac93a06ecc4ca627014d18e30f5c33b825160cc9d5c0ba61e45227': 'DecreaseUsdgAmount',
  '0xaa5649d82f5462be9d19b0f2b31a59b2259950a6076550bac9f3a1c07db9f66d': 'IncreaseReservedAmount',
  '0x533cb5ed32be6a90284e96b5747a1bfc2d38fdb5768a6b5f67ff7d62144ed67b': 'DecreaseReservedAmount',
  '0xd9d4761f75e0d0103b5cbeab941eeb443d7a56a35b5baf2a0787c03f03f4e474': 'IncreaseGuaranteedUsd',
  '0x34e07158b9db50df5613e591c44ea2ebc82834eff4a4dc3a46e000e608261d68': 'DecreaseGuaranteedUsd',
};

export const parseData = (data, topic) => {

  const hex = data.substring(2);

  const substrings = hex.match(/.{1,64}/g);

  console.log(substrings, topic)

  let res;

  // Check length of substring array. Unique topics are manually checked first.

  if (topic === 'Swap') {
    res = {
      account: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      tokenIn: '0x' + web3.utils.toBigInt('0x' + substrings[1]).toString(16),
      tokenOut: '0x' + web3.utils.toBigInt('0x' + substrings[2]).toString(16),
      amountIn: web3.utils.toBigInt('0x' + substrings[3]).toString(),
      amountOut: web3.utils.toBigInt('0x' + substrings[4]).toString(),
      amountOutAfterFees: web3.utils.toBigInt('0x' + substrings[5]).toString(),
      feeBasisPoints: web3.utils.toBigInt('0x' + substrings[6]).toString(),
    };
  }

  else if (topic === 'ClosePosition') {
    res = {
      key: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      size: web3.utils.toBigInt('0x' + substrings[1]).toString(),
      collateral: web3.utils.toBigInt('0x' + substrings[2]).toString(),
      averagePrice: web3.utils.toBigInt('0x' + substrings[3]).toString(),
      entryFundingRate: web3.utils.toBigInt('0x' + substrings[4]).toString(),
      reserveAmount: web3.utils.toBigInt('0x' + substrings[5]).toString(),
      realisedPnl: web3.utils.toBigInt('0x' + substrings[6]).toString(),
    };
  }

  else if (topic === 'UpdatePosition') {
    res = {
      key: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      size: web3.utils.toBigInt('0x' + substrings[1]).toString(),
      collateral: web3.utils.toBigInt('0x' + substrings[2]).toString(),
      averagePrice: web3.utils.toBigInt('0x' + substrings[3]).toString(),
      entryFundingRate: web3.utils.toBigInt('0x' + substrings[4]).toString(),
      reserveAmount: web3.utils.toBigInt('0x' + substrings[5]).toString(),
      realisedPnl: web3.utils.toBigInt('0x' + substrings[6]).toString(),
    };
  }

  else if (topic === 'LiquidatePosition') {
    res = {
      key: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      account: '0x' + web3.utils.toBigInt('0x' + substrings[1]).toString(16),
      collateralToken: '0x' + web3.utils.toBigInt('0x' + substrings[2]).toString(16),
      indexToken: '0x' + web3.utils.toBigInt('0x' + substrings[3]).toString(16),
      isLong: Boolean(web3.utils.toBigInt('0x' + substrings[4])),
      size: web3.utils.toBigInt('0x' + substrings[5]).toString(),
      collateral: web3.utils.toBigInt('0x' + substrings[6]).toString(),
      reserveAmount: web3.utils.toBigInt('0x' + substrings[7]).toString(),
      realisedPnl: web3.utils.toBigInt('0x' + substrings[8]).toString(),
      markPrice: web3.utils.toBigInt('0x' + substrings[9]).toString(),
    };
  }

  else if (topic === 'UpdateFundingRate') {
    res = {
      token: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      fundingRate: web3.utils.toBigInt('0x' + substrings[1]).toString(),
    };
  }

  else if (topic === 'UpdatePnl') {
    res = {
      key: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      hasProfit: Boolean(web3.utils.toBigInt('0x' + substrings[1])),
      delta: web3.utils.toBigInt('0x' + substrings[2]).toString(),
    };
  }

  else if (substrings.length === 2) { // DirectPoolDeposit, IncreasePoolAmount, DecreasePoolAmount, IncreaseUsdgAmount, DecreaseUsdgAmount, IncreaseReservedAmount, DecreaseReservedAmount, IncreaseGuaranteedUsd, and DecreaseGuaranteedUsd
    res = {
      token: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      amount: web3.utils.toBigInt('0x' + substrings[1]).toString(),
    };
  }

  else if (substrings.length === 3) { // CollectSwapFees and CollectMarginFees
    res = {
      token: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      feeUsd: web3.utils.toBigInt('0x' + substrings[1]).toString(),
      feeTokens: web3.utils.toBigInt('0x' + substrings[2]).toString(),
    };
  }

  else if (substrings.length === 5) { //BuyUSDG and SellUSDG
    res = {
      account: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      token: '0x' + web3.utils.toBigInt('0x' + substrings[1]).toString(16),
      tokenAmount: web3.utils.toBigInt('0x' + substrings[2]).toString(),
      usdgAmount: web3.utils.toBigInt('0x' + substrings[3]).toString(),
      feeBasisPoints: web3.utils.toBigInt('0x' + substrings[4]).toString(),
    };
  }

  else if (substrings.length === 9) { // DecreasePosition and LiquidatePosition
    res = {
      key: '0x' + web3.utils.toBigInt('0x' + substrings[0]).toString(16),
      account: '0x' + web3.utils.toBigInt('0x' + substrings[1]).toString(16),
      collateralToken: '0x' + web3.utils.toBigInt('0x' + substrings[2]).toString(16),
      indexToken: '0x' + web3.utils.toBigInt('0x' + substrings[3]).toString(16),
      collateralDelta: web3.utils.toBigInt('0x' + substrings[4]).toString(),
      sizeDelta: web3.utils.toBigInt('0x' + substrings[5]).toString(),
      isLong: Boolean(web3.utils.toBigInt('0x' + substrings[6])),
      price: web3.utils.toBigInt('0x' + substrings[7]).toString(),
      fee: web3.utils.toBigInt('0x' + substrings[8]).toString(),
    };
  }

  return res;

};
