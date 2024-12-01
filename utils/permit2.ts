import {
    PermitTransferFrom,
    Witness,
    SignatureTransfer,
    MaxUint256,
  } from "@uniswap/permit2-sdk";
  import { joinSignature, splitSignature } from "@ethersproject/bytes";
  import stellaSwap from "@stellaswap/swap-sdk";
  import { ethers } from "ethers";
  
  const permit2 = {
    async getPermit2Signature(token0Addr: string, amountIn: string, signer: any) {
      const addresses = await stellaSwap.getAddresses();
      const AGGREGATOR_ADDRESS = addresses.aggregator;
      const PERMIT2_ADDRESS = addresses.permit2;
  
      const nonce = ethers.utils.randomBytes(32);
  
      const permit: PermitTransferFrom = {
        permitted: {
          token: token0Addr,
          amount: amountIn,
        },
        spender: AGGREGATOR_ADDRESS,
        nonce: nonce,
        deadline: MaxUint256,
      };
  
      const witness: Witness = {
        witnessTypeName: "Witness",
        witnessType: { Witness: [{ name: "user", type: "address" }] },
        witness: { user: AGGREGATOR_ADDRESS },
      };
  
      const { domain, types, values } = SignatureTransfer.getPermitData(
        permit,
        PERMIT2_ADDRESS,
        await signer.getChainId(),
        witness
      );
  
      const signature = await signer._signTypedData(domain, types, values);
      let { r, s, v } = splitSignature(signature);
  
      if (v == 0) v = 27;
      if (v == 1) v = 28;
  
      return { signature: joinSignature({ r, s, v }), permit, witness };
    },
  };
  
  export default permit2;