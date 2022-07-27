import React, { useState, useEffect } from "react";
import { handleBionification } from "../background";

const Input = () => {
  const [toggle, setToggle] = useState(false);
  const [loading, setLoading] = useState(false);
  const [params, setParams] = useState({
    fixation: "3",
    saccade: "10",
  });

  const submitHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
    handleBionification(toggle);
  };

  const onFixationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => {
      return { ...prev, fixation: e.target.value };
    });
  };

  const onSaccadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setParams((prev) => {
      return { ...prev, saccade: e.target.value };
    });
  };

  useEffect(() => {
    // chrome.storage.sync.get("orgBody", function (items) {
    //   if (items) {
    //     console.log(">>>> in usse effect again");
    //     console.log(">>>>org body", items);
    //   }
    // });
  }, []);

  return (
    <div className="user-input">
      <form className="user-input__form">
        <div className="user-input__control">
          <button className={`user-input__${toggle}`} onClick={submitHandler}>
            {toggle ? "Turn off" : "Turn on"}
          </button>
        </div>
        <div className="user-input__control">
          <label htmlFor="">Fixation: </label>
          <input
            type="range"
            min="1"
            max="100"
            value={params.fixation}
            onChange={onFixationChange}
            disabled={!toggle}
          />
        </div>
        <div className="user-input__control">
          <label htmlFor="">Saccade: </label>
          <input
            type="range"
            min="1"
            max="10"
            value={params.saccade}
            onChange={onSaccadeChange}
            disabled={!toggle}
          />
        </div>
      </form>
    </div>
  );
};

export default Input;
