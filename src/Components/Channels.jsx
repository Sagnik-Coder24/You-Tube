import React from "react";
import noimg from "../assets/noimg.jpeg";

const Channels = ({ channelDetails, setChannelId }) => {
  return (
    <div className="channel-list">
      {channelDetails.map((channel) => (
        <div key={channel.id} className="channel-item">
          <img
            onClick={() => {
              setChannelId(channel.id);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
            src={channel.img}
            alt={channel.title}
            className="channel-img"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = noimg;
            }}
          />
          <h3 className="channel-title">{channel.title}</h3>
        </div>
      ))}
    </div>
  );
};

export default Channels;
