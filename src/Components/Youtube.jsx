import React, { useEffect, useState } from "react";
import Header from "./Header";
import Channels from "./Channels";
import youtube from "../assets/youtube.jpeg";
import error from "../assets/error.jpeg";

const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;

const Youtube = () => {
  const [resultYT, setResultYT] = useState([]);
  const [maxResults, setMaxResults] = useState(5);
  const [totalResults, setTotalResults] = useState(null);
  const [nextPageToken, setNextPageToken] = useState("");
  const [channelName, setChannelName] = useState(null);
  const [channelDetails, setChannelDetails] = useState([]);
  const [channelId, setChannelId] = useState(null);
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (channelName && isLoading) {
      getChannelDetatls();
    }
  }, [channelName, isLoading]);

  useEffect(() => {
    if (channelId) {
      const finalURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${channelId}&part=snippet,id&order=date&maxResults=${maxResults}`;

      const clickedYT = () => {
        fetch(finalURL)
          .then((response) => response.json())
          .then((data) => {
            if (data.error) {
              setErr(
                <>
                  <span>
                    <b>Error Code : </b>
                    {data.error.code}
                  </span>
                  <br />
                  <span>
                    <b>Error Message : </b>
                    {data.error.errors.map((i) => i.message)}
                  </span>
                </>
              );
              return;
            }
            if (data.pageInfo.resultsPerPage > 0) {
              setResultYT(
                data.items.map(
                  (obj) => `https://www.youtube.com/embed/${obj.id.videoId}`
                )
              );
            } else {
              setErr(<span>No results returned...</span>);
            }
          })
          .catch((error) => {
            setErr(<span>{error.message}</span>);
          });
      };
      clickedYT();
    }
  }, [maxResults, channelId]);

  const getChannelDetatls = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=channel&q=${channelName}&maxResults=48&pageToken=${nextPageToken}&key=${apiKey}`
      );
      const data = await response.json();
      if (data.error) {
        setErr(
          <>
            <span>
              <b>Error Code : </b>
              {data.error.code}
            </span>
            <br />
            <span>
              <b>Error Message : </b>
              {data.error.errors.map((i) => i.message)}
            </span>
          </>
        );
        return;
      }
      if (data.pageInfo.resultsPerPage > 0) {
        setTotalResults(data.pageInfo.totalResults);
        const channelDetails = data.items.map((i) => {
          const detail = {
            id: i.id.channelId,
            title: i.snippet.channelTitle,
            img: i.snippet.thumbnails.default.url,
          };
          return detail;
        });
        setChannelDetails((prevDetails) => [...prevDetails, ...channelDetails]);
        if (data.nextPageToken) {
          setNextPageToken(data.nextPageToken);
        } else {
          setNextPageToken("");
        }
      } else {
        setErr(<span>No results returned...</span>);
      }
    } catch (error) {
      setErr(<span>{error.message}</span>);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Header
        setMaxResults={setMaxResults}
        setChannelName={setChannelName}
        setChannelId={setChannelId}
        setChannelDetails={setChannelDetails}
        setErr={setErr}
        setIsLoading={setIsLoading}
        setNextPageToken={setNextPageToken}
      />
      {isLoading && (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      )}
      {!isLoading && err && (
        <div className="container">
          <h2 className="title">ERROR</h2>
          {err}
          <p>Please try again after some time...</p>
          <br />
          <img src={error} alt="Error" />
        </div>
      )}
      {!isLoading &&
        !err &&
        Object.keys(channelDetails).length === 0 &&
        !channelId && (
          <div className="container">
            <h2 className="title">Search Any Channel</h2>
            <br />
            <img src={youtube} alt="YouTube" />
          </div>
        )}
      {!isLoading &&
        !err &&
        Object.keys(channelDetails).length !== 0 &&
        channelId &&
        resultYT.map((item, i) => (
          <div className="youtube" key={i}>
            <iframe
              width="560"
              height="315"
              src={item}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        ))}
      {!isLoading && !err && Object.keys(channelDetails).length !== 0 && (
        <>
          <Channels
            channelDetails={channelDetails}
            setChannelId={setChannelId}
          />
          <br />
          {nextPageToken !== "" && (
            <button className="submit-button" onClick={getChannelDetatls}>
              Load more
            </button>
          )}
          <br />
          <div className="footer">
            <p>Total channels</p>

            <p>{totalResults}</p>
          </div>
        </>
      )}
    </>
  );
};

export default Youtube;
