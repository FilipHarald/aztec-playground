import {
  AztecNode,
  DebugLogger,
  PXE,
  createDebugLogger,
} from "@aztec/aztec.js";
import {
  ContractInstanceDeployedEvent,
  ContractClassRegisteredEvent,
} from "@aztec/circuits.js";
import { ClassRegistererAddress } from '@aztec/protocol-contracts/class-registerer';
import { nodeUtils, pxeUtils } from "./index.js";

describe("Voting", () => {
  let node: AztecNode;
  let pxe: PXE;
  let logger: DebugLogger;

  beforeAll(async () => {
    logger = createDebugLogger("aztec:aztec-starter");
    logger.info("Aztec-Starter tests running.");

    const [azNode, azPxe] = await Promise.all([
      nodeUtils.setup(),
      pxeUtils.setup(),
    ]);
    node = azNode;
    pxe = azPxe;
  });

  it("works", async () => {
    const res = await node.getBlock(1);
    expect(res).toBeDefined();
  }, 300_000);

  it("can get contract data", async () => {
    const i = 214;
      const block = await node.getBlock(i);
      expect(block).toBeDefined();
      const blockLogs = block!.body.txEffects
        .flatMap((txEffect) => (txEffect ? [txEffect.unencryptedLogs] : []))
        .flatMap((txLog) => txLog.unrollLogs());
      const contractInstances =
        ContractInstanceDeployedEvent.fromLogs(blockLogs);
      const contractClasses = ContractClassRegisteredEvent.fromLogs(blockLogs, ClassRegistererAddress);
      expect(contractInstances[0].contractClassId.toString()).toEqual("0x103bfee81ad018bc58f15008d9cc7f1fb552099e5a1c7ae9fbcde0a56c0def1d");
      expect(contractClasses[0].contractClassId.toString()).toEqual("0x103bfee81ad018bc58f15008d9cc7f1fb552099e5a1c7ae9fbcde0a56c0def1d");

  }, 300_000);
});
