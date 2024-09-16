import { PXE, createPXEClient, waitForPXE } from "@aztec/aztec.js";

export const setup = async () => {
  const { PXE_URL = "http://localhost:8080" } = process.env;
  const pxe = createPXEClient(PXE_URL);
  await waitForPXE(pxe);
  return pxe;
};

export const getBlock = async (pxe: PXE, height: number) => {
  return await pxe.getBlock(height);
};
