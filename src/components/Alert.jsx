import React from "react";

export default function Alert(props) {
  return (
    <div style={{ height: "50px" }}>
      {props.message && (
        <div className={`alert alert-${props.message.type}`} role="alert">
          {props.message.message}
        </div>
      )}
    </div>
  );
}
