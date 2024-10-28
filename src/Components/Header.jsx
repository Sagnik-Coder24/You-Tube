import React, { useRef } from "react";

const Header = ({
  setMaxResults,
  setChannelName,
  setChannelId,
  setChannelDetails,
  setErr,
  setIsLoading,
  setNextPageToken,
}) => {
  const resultRef = useRef(5);
  const channelRef = useRef("");

  const increaseValue = () => {
    if (resultRef.current && resultRef.current.value < 20) {
      resultRef.current.value = parseInt(resultRef.current.value) + 1;
      setMaxResults(resultRef.current.value);
    }
  };

  const decreaseValue = () => {
    if (resultRef.current && resultRef.current.value > 1) {
      resultRef.current.value = parseInt(resultRef.current.value) - 1;
      setMaxResults(resultRef.current.value);
    }
  };

  const resultChange = () => {
    setMaxResults(resultRef.current.value);
  };

  const channelSubmit = (event) => {
    event.preventDefault();
    if (channelRef.current.value !== "") {
      setErr(null);
      setIsLoading(true);
      setNextPageToken("");
      setChannelId(null);
      setChannelDetails([]);
      setChannelName(channelRef.current.value);
      channelRef.current.value = "";
    }
  };

  return (
    <>
      <h2>Welcome, watch top YouTube videos</h2>
      <div className="input-container">
        <form onSubmit={channelSubmit} className="channel-form">
          <input
            type="text"
            placeholder="Type a channel name"
            ref={channelRef}
            className="channel-input"
          />
          <button type="submit" className="submit-button">
            Submit
          </button>
        </form>
        <form>
          <label htmlFor="results">Video Count</label>
          <input
            type="number"
            id="results"
            name="results"
            min="1"
            max="20"
            step="1"
            defaultValue="5"
            ref={resultRef}
            onChange={resultChange}
          />
          <div className="arrow-button">
            <button
              type="button"
              className="arrow-up"
              onClick={increaseValue}
            ></button>
            <button
              type="button"
              className="arrow-down"
              onClick={decreaseValue}
            ></button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Header;
