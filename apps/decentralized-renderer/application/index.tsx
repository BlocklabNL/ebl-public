import ReactDOM from "react-dom";
import { blCertificate } from "../src/templates/sample";
import React from "react";
import { App } from "./app";

ReactDOM.render(
  <App
    documents={[
      {
        name: "Default document",
        document: {
          ...blCertificate,
          $template: {
            name: "BILL_OF_LADING",
            type: "EMBEDDED_RENDERER",
            // Use this to test the remote version
            // url: "https://renderer.ebl.dev"
            url: "http://localhost:3000"
          }
        }
      }
    ]}
  />,
  document.getElementById("root")
);
