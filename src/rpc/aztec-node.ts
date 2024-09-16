import { AztecNode, createAztecNodeClient } from "@aztec/aztec.js";

export const setup = async () => {
  const { RPC_URL } = process.env;
  if (!RPC_URL) {
    throw new Error("Missing RPC_URL environment variable.");
  }
  const node = createAztecNodeClient(RPC_URL);
  await node.getChainId();

  return node;
};

export const getBlock = async (node: AztecNode, height: number) => {
  return await node.getBlock(height);
};
