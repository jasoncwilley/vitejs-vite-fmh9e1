import React, { useState, useEffect } from "react";
import "./ArtCard.css";
import {Button} from "react-bootstrap";
import { useConnection } from "@solana/wallet-adapter-react";

const { programs } = require("@metaplex/js");
const axios = require("axios").default;

const ArtCard = (props) => {
  const { connection } = useConnection();
  const [metadata, setMetadata] = useState({});
  const [mintAddress,setMintaddress]=useState('');
  const [price,setPrice]=useState("");
  useEffect(() => {
    if(props.type=="Buy"){
      fetch(props.pubkey).then((res)=>{
        localStorage.setItem(props.pubkey.slice(0,10),res.price)
        programs.metadata.Metadata.load(
          connection,
          res.nft_address
        ).then((data)=>{
          console.log(data)
          setMintaddress(data.data.mint)
          axios.get(data.data.data.uri).then((response) => {
            console.log(response.data)
            setMetadata(response.data);
          });
        });
      })
    }
    else{
      console.log(props.pubkey)
      programs.metadata.Metadata.load(
        connection,
        props.pubkey
      ).then((data)=>{
        console.log(data)
        setMintaddress(data.data.mint)
        axios.get(data.data.data.uri).then((response) => {
          setMetadata(response.data);
        });
      });
    }
  },[]);
  return (
    <div className="card-container">
      <div className="card">
        <div className="imgBx">
          <img src={metadata.image} alt="" />
        </div>
        <div className="content">
          <p className="title">{metadata.name}</p>
          <p>{metadata.description}</p>


          </div>
        </div>
      </div>
    
  );
};

export default ArtCard;
