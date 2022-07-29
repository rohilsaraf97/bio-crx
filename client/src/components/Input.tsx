import React, { useState, useEffect } from "react";
import { handleBionification } from "../handleBionify";

const Input = () => {
  const [toggle, setToggle] = useState(false);
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
    const getStorage = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      chrome.scripting.executeScript(
        {
          target: { tabId: tab.id! },
          func: function () {
            console.log(localStorage);
            return JSON.stringify(localStorage);
          },
        },
        (injectionResults) => {
          if (injectionResults[0].result !== null) {
            if (JSON.parse(injectionResults[0].result).orgBody) {
              setToggle(true);
            }
          }
        }
      );
    };
    getStorage();
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
