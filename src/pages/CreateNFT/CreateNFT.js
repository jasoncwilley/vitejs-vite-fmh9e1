import React, { Component, useState } from "react";
import Header from "../../components/Header/Header";
import ItemButton from "../../components/ItemButton/ItemButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { WalletNotConnectedError } from "@solana/wallet-adapter-base";
import "./CreateNFT.css";
import Select from "react-dropdown-select";
import Stepper from "../../components/Stepper/Stepper";
import TextInput from "../../components/TextInput/TextInput";
import FileUpload from "./FileUpload/FileUpload";

import DetailsForm from "./DetailsForm/DetailsForm";
import Launch from "./Launch/Launch";
// const CreateNFT = () => {
//     return (
//       <div className = "nft-container">
//         <Header heading="Create NFT"/>
//         <div className="pane-view">
//           <div className="progress-cont">
//             <Progress/>
//           </div>
//           <div className="options">
//             <ItemButton heading="Image" subheading="(.PNG,.JPG,.SVG)"/>
//             <ItemButton heading="Video" subheading="(.PNG,.JPG,.SVG)"/>
//             <ItemButton heading="Audio" subheading="(.PNG,.JPG,.SVG)"/>
//             </div>
//             </div>
//       </div>
//     );
//   }

//   export default CreateNFT;

export default function CreateNFT() {
  const { connection } = useConnection();
  const { publicKey,signTransaction } = useWallet();
  const [page, setPage] = useState(1);
  const [data, setData] = useState({
    user: {},
    profile: {},
    settings: {},
  });

  function goNextPage() {
    if (page === 2) return;
    setPage((page) => page + 1);
  }
  function goPrevPage() {
    if (page === 1) return;
    setPage((page) => page - 1);
  }
  function mint() {
    console.log("mint");
  }
  function updateData(type, newData) {
    setData((data) => {
      return { ...data, [type]: newData };
    });
  }

  function submit() {
    fetch("/api/form", { method: "POST", body: JSON.stringify(data) });
  }

  return (
    <div className="nft-container">
      <Header heading="Create NFT" />
      <div className="pbar">
        <progress variant="light" className="pbar-item" max="2" value={page} />
      </div>

      {/* the content goes here */}
      <div>
        {page === 1 && <OnboardingOne data={data.user} update={updateData} />}
        {page === 2 && (
          <OnboardingThree data={data.settings} update={updateData} connection={connection} publicKey={publicKey} signTransaction={signTransaction}/>
        )}
        {/* {page === 3 && <OnboardingFour />} */}
      </div>
      <hr className="hr-line" />
      <div className="buttons">
        {page !== 1 && (
          <button className="step-btn-mint" onClick={goPrevPage}>
            Back
          </button>
        )}
        {page !== 2 && (
          // <button className="step-btn" onClick={goNextPage}>
          <button className="step-btn-mint" onClick={goNextPage}>
            Next
          </button>
        )}
        {/* {page === 2 && (
          <button className="step-btn-mint" type="submit" onClick={mint}>
            Back
          </button>
        )} */}
      </div>
    </div>
  );
}

function OnboardingOne() {
  const options = [
  {
    id: 1,
    name: 'Automobile'
  },
  {
    id: 2,
    name: 'Computer or Laptop'
  },
  {
  id: 3,
  name: 'Other'
 },
];

  return (
    <div className="pane-view">
      <div className="progress-cont">
        <div className="txt-shine">
          <u>Step 1:</u>
          <p className='stepone'>Select Contract Type</p>
        </div>

      </div>
      <div className="select">
      <Select
        options={options}
        labelField="name"
        valueField="id"
        onChange={(values) => this.setValues(values)}
      />;


      </div>
    </div>
  );
}

function OnboardingTwo({ values, update }) {
  return (
    <div className="pane-view">
      <div className="progress-cont">
        <div className="txt-shine">
          <u>Step 2:</u> Upload Files
        </div>

      </div>
      <div className="options">
        <FileUpload />
      </div>
    </div>
  );
}

function OnboardingThree(props) {
  return (
    <div className="pane-view">
      <div className="progress-cont">
        <div className="txt-shine">
          <u>Step 2:</u> Enter Details
        </div>

      </div>
      <div className="options">
        <DetailsForm connection={props.connection} signTransaction={props.signTransaction} publicKey={props.publicKey}/>
      </div>
    </div>
  );
}

function OnboardingFour({ data, update }) {
  return (
    <div className="pane-view">
      <div className="progress-cont">
        <div className="txt-shine">
          <u>Step 3:</u> Launch
        </div>

      </div>
      <div className="options">
        <Launch royalty="30%" price="10" />
      </div>
    </div>
  );
}
