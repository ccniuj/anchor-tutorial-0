import * as anchor from '@project-serum/anchor';
import * as dotenv from 'dotenv';
dotenv.config();

describe("basic-0", () => {
  // Configure the client to use the devnet cluster.
  const rpcUrl = process.env.RPC_URL;
  const connection = new anchor.web3.Connection(rpcUrl);
  const key = process.env.KEY.split(',').map(str => parseInt(str));
  const keypair = anchor.web3.Keypair.fromSecretKey(new Uint8Array(key));
  const wallet = new anchor.Wallet(keypair);
  const option = anchor.Provider.defaultOptions();
  const provider = new anchor.Provider(connection, wallet, option);
  
  anchor.setProvider(provider);

  it("Uses the workspace to invoke the initialize instruction", async () => {
    // #region code
    // Read the deployed program from the workspace.
    const program = anchor.workspace.Basic0;

    // Execute the RPC.
    await program.rpc.initialize();
    // #endregion code
  });
});
