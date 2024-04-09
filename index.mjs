//@ts-check

import {
    clusterApiUrl,
    Connection,
    PublicKey,
    Keypair,
    Transaction,
  } from "@solana/web3.js";
  import {
    createTransferCheckedInstruction,
    mintTo,
    TOKEN_2022_PROGRAM_ID,
    TOKEN_PROGRAM_ID,
    transfer,
    transferChecked,
  } from "@solana/spl-token";
  import bs58 from "bs58";
  
  (async () => {
    // connection
    const connection = new Connection(clusterApiUrl("mainnet-beta"), "confirmed");
  
    // 5YNmS1R9nNSCDzb5a7mMJ1dwK9uHeAAF4CmPEwKgVWr8
    const feePayer = Keypair.fromSecretKey(
      bs58.decode(
        "31vkqZMnc49frRM4xUPgpMtzhpURfWNiz7nH5zhu8zJf6scwf5Ai7D7o76eYDsZHhBDYYCwwmYAVe6frtFzvx68G"
      )
    );
  
    const tokenAccount = new PublicKey(
      "HWkT9kyMFWYgYYwmG8fe4CSshkBWhP5MTVonhgrkp7gw"
    );

    // G2FAbFQPFa5qKXCetoFZQEvF9BVvCKbvUZvodpVidnoY
    const alice = Keypair.fromSecretKey(
      bs58.decode(
        "31vkqZMnc49frRM4xUPgpMtzhpURfWNiz7nH5zhu8zJf6scwf5Ai7D7o76eYDsZHhBDYYCwwmYAVe6frtFzvx68G"
      )
    );
  
    const mintPubkey = new PublicKey(
      "9xCL23qT78uj8T6fWCmYkzLPYnm29MSMXGoJrcC2ScJ2"
    );
  
    const tokenAccountXPubkey = new PublicKey(
      "9muyaY73A3JSAYbr3zwDmripjyB86DsFd1eWuVq6gLsy"
    );
    const tokenAccountYPubkey = new PublicKey(
      "HWkT9kyMFWYgYYwmG8fe4CSshkBWhP5MTVonhgrkp7gw"
    );

    // mintto

    // let tx = await mintTo(connection, feePayer, mintPubkey, tokenAccountYPubkey, feePayer, 1e8);
    // console.log('tx', tx);
  
  //   // 1) use build-in function
  //   {
    // TODO: remint token and use mintTo function
      let txhash = await transfer(
        connection, // connection
        feePayer, // payer
        tokenAccountXPubkey, // from (should be a token account)
        tokenAccountYPubkey, // to (should be a token account)
        feePayer.publicKey,
        1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
        undefined,
        undefined,
        TOKEN_2022_PROGRAM_ID
      );
      console.log(`txhash: ${txhash}`);
  
  
      let tokenAmount = await connection.getTokenAccountBalance(tokenAccount);
      console.log(`amount: ${tokenAmount.value.amount}`);
    console.log(`decimals: ${tokenAmount.value.decimals}`);
})();
  
      //   }
  // } 
    // or
  
    // 2) compose by yourself
    // {
    //   let tx = new Transaction().add(
    //     createTransferCheckedInstruction(
    //       tokenAccountXPubkey, // from (should be a token account)
    //       mintPubkey, // mint
    //       tokenAccountYPubkey, // to (should be a token account)
    //       alice.publicKey, // from's owner
    //       1e8, // amount, if your deciamls is 8, send 10^8 for 1 token
    //       8 // decimals
    //     )
    //   );
    //   console.log(
    //     `txhash: ${await connection.sendTransaction(tx, [
    //       feePayer,
    //       alice /* fee payer + owner */,
    //     ])}`
    //   );
    // }
  // } )();
  