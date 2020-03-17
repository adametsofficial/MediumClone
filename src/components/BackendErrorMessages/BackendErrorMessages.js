import React from "react";

export const BackendErrorMessages = ({ backendError }) => {
  const error = Object.keys(backendError).map(name => {
    const message = backendError[name].join(" ");
    return `${name} ${message}`;
  });

  return (
    <ul className="error-messages">
      {error.map((val, key) => {
        return <li key={key}>{val}</li>;
      })}
    </ul>
  );
};
