import React, { useState } from "react";

const Input = () => {
  const [toggle, setToggle] = useState(false);

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setToggle((prev) => !prev);
  };

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
          <input type="range" min="1" max="100" disabled={!toggle} />
        </div>
        <div className="user-input__control">
          <label htmlFor="">Saccade: </label>
          <input type="range" min="1" max="10" disabled={!toggle} />
        </div>
      </form>
    </div>
  );
};

export default Input;
