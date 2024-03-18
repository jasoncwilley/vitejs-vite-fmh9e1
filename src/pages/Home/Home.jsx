import React from "react";
import './Home.css'
import { useState, useCallback, useEffect } from "react";
import ArtCard from "../../components/ArtCard/ArtCard";
import Header from "../../components/Header/Header";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import { Button } from "react-bootstrap";

//import CustomButton from "../../components/customButton/CustomButton.js";
 import CustomButton from '../../components/customButton/CustomButton';

const { programs } = require("@metaplex/js");

const Home = () => {
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();
  const [nfts, setNFTs] = useState([]);
  const fetchNFTs = async () => {
    if (!publicKey) throw new WalletNotConnectedError();
    let fetchednfts = await programs.metadata.Metadata.findByOwnerV2(
      connection,
      publicKey.toBase58()
    );
    // let ntfdata=[]
    // for(let nft of fetchednfts){
    //   const Metadata = await programs.metadata.Metadata.load(
    //     connection,
    //     nft.pubkey.toBase58()
    //   );
    //   axios.get(Metadata.data.data.uri).then((response) => {
    //     ntfdata.push(response.data)
    //   });
    // }
    setNFTs(fetchednfts); ////yeh set nhi ho rha
  };
  const [offsetY, setOffsetY] = useState(0);
  const [margin, setMargin] = useState("10%");

  const handleScroll = () => {
    setOffsetY(window.pageYOffset);
    setMargin({ margin: "-5%" });
  };
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <section>

        <h2
          id="text"
          alignitems='center'
          style={{
            transform: `translateY(${offsetY * 0.4}px)`,
            marginBottom: `${margin}`,
          }}
        >
          {" "}
        PlanitContract
        </h2>
        <a
          href="#body"
          alignitems='center'
          className="btn"
          id="btns"
          style={{ transform: `translateY(${offsetY * 0.3}px)` }}
        >
          Your NFTs
        </a>

        {/* <Helmet>
         <script src="./screen.js">


         </script>
      </Helmet> */}
      </section>
      <div className="main-cont" id="body">
        <div
          className="Head"
          style={{
            display: "flex",
            flexDirection: "column",
            alignitems: "center",
          }}
        >
          <Header heading="Your NFT's" />
          <button
            className="browser-btn"
            onClick={fetchNFTs}
            style={{ width: 150, margin: 50 }}
          >
            Fetch
          </button>
        </div>
        <div className="container">
          {nfts.map((nft) => (
            <ArtCard
              key={nft.pubkey.toBase58()}
              pubkey={nft.pubkey.toBase58()}
              connection={connection}
              publicKey={publicKey}
              sendTransaction={sendTransaction}
              type="Sell"
            />
          ))}
        </div>
        <hr className="hr-line" />
      </div>
    </>
  );
};

export default Home;
