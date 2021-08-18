import * as anchor from '@project-serum/anchor';
import * as fs from 'fs';
import * as dotenv from 'dotenv';
dotenv.config();

const rpcUrl = process.env.RPC_URL;
const connection = new anchor.web3.Connection(rpcUrl);
const key = process.env.KEY.split(',').map(str => parseInt(str));
const keypair = anchor.web3.Keypair.fromSecretKey(new Uint8Array(key));
const wallet = new anchor.Wallet(keypair);
const option = anchor.Provider.defaultOptions();
const provider = new anchor.Provider(connection, wallet, option);

anchor.setProvider(provider);

async function main() {
  // #region main
  // Read the generated IDL.
  const artifact = await fs.readFileSync('./target/idl/basic_0.json', 'utf8');
  const idl = JSON.parse(artifact);

  // Address of the deployed program.
  const programId = new anchor.web3.PublicKey(idl.metadata.address);

  // Generate the program client from IDL.
  const program = new anchor.Program(idl, programId);

  // Execute the RPC.
  await program.rpc.initialize();
  // #endregion main
}

console.log('Running client.');
main().then(() => console.log('Success'));
