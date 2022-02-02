import React, { FunctionComponent } from "react";
import "bootstrap/dist/css/bootstrap.css";
import "./style.css";
import { TemplateProps } from "@govtechsg/decentralized-renderer-react-components";
import { BLCertificate } from "../sample";

const borderStyle = {
  borderStyle: "solid",
  borderWidth: 0.5,
  borderColor: "#000"
};

const smallText = (text: string): JSX.Element => <div style={{ fontSize: "0.8em" }}>{text}</div>;

const Section3 = (): JSX.Element => (
  <div style={borderStyle}>
    <div className="row">
      <div className="col-3 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Freight & Charges")}
        <div className="p-2 m-2">
          <div>Tvs</div>
          <div>Phones</div>
          <div>Screens</div>
        </div>
      </div>
      <div className="col-2 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Rule")}
      </div>
      <div className="col-2 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Unit")}
      </div>
      <div className="col-1 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Currency")}
      </div>
      <div className="col-2 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Prepaid")}
      </div>
      <div className="col-2 p-2" style={{ minHeight: 100, ...borderStyle }}>
        {smallText("Collect")}
      </div>
    </div>

    <div className="row">
      <div className="col-6 d-flex flex-column">
        {/* Row1 */}
        <div className="d-flex" style={{ flex: 1 }}>
          <div className="p-2 col-6" style={{ ...borderStyle }}>
            {smallText(
              "Carrier's Receipt (see clause 1 and 14). Total number of containers or packages received by Carrier."
            )}
            <div>1 container</div>
          </div>
          <div className="d-flex flex-column col-6">
            <div className="p-2" style={{ flex: 1, ...borderStyle }}>
              {smallText("Place of Issue of B/L")}
            </div>
          </div>
        </div>

        {/* Row2 */}
        <div className="d-flex" style={{ flex: 1 }}>
          <div className="p-2 col-6" style={{ ...borderStyle }}>
            {smallText("Number & Sequence of Original B(s)/L")}
            FOUR/4
          </div>
          <div className="d-flex flex-column col-6">
            <div className="p-2" style={{ flex: 1, ...borderStyle }}>
              {smallText("Date of Issue of B/L")}
            </div>
          </div>
        </div>

        {/* Row2 */}
        <div className="d-flex" style={{ flex: 1 }}>
          <div className="p-2 col-6" style={{ ...borderStyle }}>
            {smallText("Declared Value (see clause 7.3)")}
          </div>
          <div className="d-flex flex-column col-6">
            <div className="p-2" style={{ flex: 1, ...borderStyle }}>
              {smallText("Shipped on Board Date (Local Time)")}
            </div>
          </div>
        </div>
      </div>
      <div className="col-6 p-2" style={borderStyle}>
        <div>
          {smallText(
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Sagittis id consectetur purus ut faucibus. Diam quam nulla porttitor massa. Eu tincidunt tortor aliquam nulla facilisi cras fermentum. Amet mauris commodo quis imperdiet massa tincidunt. Luctus accumsan tortor posuere ac ut. Eu volutpat odio facilisis mauris sit amet massa vitae tortor. Eros donec ac odio tempor orci dapibus. Varius morbi enim nunc faucibus a pellentesque sit amet. Velit aliquet sagittis id consectetur purus ut. Porta non pulvinar neque laoreet suspendisse interdum consectetur libero. Odio ut sem nulla pharetra diam sit. Nunc sed augue lacus viverra vitae congue eu consequat ac. Eros in cursus turpis massa tincidunt dui ut ornare lectus."
          )}
        </div>
        <div className="text-center mt-3 mb-5">
          <strong>{smallText("Signed for the Carrier __________________")}</strong>
        </div>
        <hr />
        <div className="text-center mt-2">
          <strong>{smallText("As Agent(s) for the Carrier")}</strong>
        </div>
      </div>
    </div>
  </div>
);

const Section2 = (document: BLCertificate): JSX.Element => {
  const packages = document.packages || [];
  const renderedKindOfPackage = packages.map((pkg, index) => <div key={index}>{pkg.description}</div>);
  const renderedWeight = packages.map((pkg, index) => <div key={index}>{pkg.weight}</div>);
  const renderedMeasurement = packages.map((pkg, index) => <div key={index}>{pkg.measurement}</div>);

  return (
    <div className="row" style={borderStyle}>
      <div className="col-8 p-2" style={borderStyle}>
        <div style={{ fontSize: "0.8em" }}>
          Kind of Packages: Description of goods, Marks and Numbers: Container No./Serial No.
        </div>
        {renderedKindOfPackage}
        <div style={{ fontSize: "0.8em" }} className="mt-2">
          Above particulars as declared by Shipper, but without responsibility of our representation by Carrier (see
          clause 14)
        </div>
      </div>
      <div className="col-2 p-2" style={borderStyle}>
        <div style={{ fontSize: "0.8em" }}>Weight</div>
        {renderedWeight}
      </div>
      <div className="col-2 p-2" style={borderStyle}>
        <div style={{ fontSize: "0.8em" }}>Measurement</div>
        {renderedMeasurement}
      </div>
    </div>
  );
};

const Section1 = (document: BLCertificate): JSX.Element => {
  const { shipper = {}, blNumber, consignee = {}, notifyParty = {} } = document;
  return (
    <div className="d-flex flex-column" style={borderStyle}>
      {/* Row 1 */}
      <div className="d-flex">
        <div className="p-2 col-6" style={{ ...borderStyle }}>
          <svg viewBox="0 0 272 72" xmlns="http://www.w3.org/2000/svg">
            <path d="M19.372 19.694h19.507c6.277 0 10.719 3.767 10.719 9.175 0 2.704-1.303 4.972-3.428 6.276v.097c2.848 1.498 4.635 4.395 4.635 7.82 0 7.053-4.442 10.432-13.617 10.432H19.372v-33.8zm17.72 12.796c2.028 0 3.04-.87 3.04-2.511 0-1.593-1.012-2.414-3.04-2.414h-8.498v4.925h8.498zm.772 13.133c2.463 0 3.525-.916 3.525-2.994 0-1.93-1.158-2.992-3.525-2.992h-9.27v5.986h9.27zM54 54V20h9v34h-9zm11.845-13.301c0-8.16 6.374-13.81 15.209-13.81 8.79 0 15.163 5.65 15.163 13.81s-6.373 13.81-15.163 13.81c-8.835 0-15.21-5.65-15.21-13.81zm21.1 0c0-3.332-2.267-5.796-5.891-5.796-3.667 0-5.938 2.464-5.938 5.796 0 3.332 2.27 5.793 5.938 5.793 3.624 0 5.892-2.461 5.892-5.793zm11.027 0c0-8.064 6.326-13.81 14.92-13.81 6.954 0 12.65 3.766 14.148 9.27l-8.594 2.656c-.725-2.366-2.752-3.912-5.554-3.912-3.332 0-5.649 2.318-5.649 5.796 0 3.476 2.317 5.793 5.65 5.793 2.801 0 4.877-1.593 5.553-3.91l8.594 2.656c-1.498 5.504-7.194 9.27-14.148 9.27-8.594 0-14.92-5.746-14.92-13.81zM130 20h9.338v16.87h.097l9.969-8.736H162l-12.352 10.443L161.903 54h-10.749l-7.585-10.004h-.098l-4.133 3.318V54H130V20zm34 0h9.346v25.645H190V54h-26V20zm29.025 26.057c0-4.586 3.524-7.049 11.78-8.16 4.683-.676 6.228-1.303 6.228-2.607 0-1.16-1.545-2.028-3.766-2.028-3.137 0-5.213 1.545-5.744 4.153l-8.402-1.303c.916-5.36 6.712-9.223 13.906-9.223 8.207 0 13.376 4.2 13.376 10.961v15.644h-8.501v-2.318h-.096c-2.173 2.028-5.07 3.041-8.836 3.041-6.132 0-9.945-3.09-9.945-8.16zm18.3-2.414v-2.172h-.097c-.434.676-1.497 1.11-4.297 1.737-3.623.773-4.781 1.353-4.781 2.414 0 1.161 1.11 1.788 3.283 1.788 3.09 0 5.892-1.788 5.892-3.767zm20.802 7.388h-.097v2.463h-8.499v-33.64h9.272v9.883h.096c2.029-1.786 4.585-2.56 7.387-2.56 7.871 0 13.857 5.989 13.857 13.57 0 7.628-5.697 13.18-13.76 13.18-3.333 0-6.374-1.157-8.257-2.896zm12.745-10.382c0-3.233-2.558-5.455-6.373-5.455-3.136 0-5.696 1.835-5.696 4.152v2.414c0 2.367 2.56 4.2 5.697 4.2 3.911 0 6.373-2.122 6.373-5.311zM272 72h-49v-9.567h39.545V9.566H223V0h49v72zM0 72V0h49v9.566H9.455v52.867H49V72H0z" />
          </svg>
        </div>
        <div className="d-flex col-6">
          <div className="d-flex" style={{ flex: 1 }}>
            <div className="p-2" style={{ flex: 5, ...borderStyle }}>
              <strong>BILL OF LADING FOR OCEAN TRANSPORT OR MULTIMODAL TRANSPORT</strong>
            </div>
            <div style={{ flex: 3 }} className="d-flex flex-column">
              <div className="p-2" style={{ flex: 1, ...borderStyle }}>
                SCAC <strong>BLOCK</strong>
              </div>
              <div className="p-2" style={{ flex: 1, ...borderStyle }}>
                B/L No <strong>{blNumber}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Row 2 */}
      <div className="d-flex">
        <div className="p-2 col-6" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Shipper</div>
          <div className="p-2 m-2">
            <div>{shipper.name || ""}</div>
            <div>{(shipper.address && shipper.address.street) || ""}</div>
            <div>{(shipper.address && shipper.address.country) || ""}</div>
          </div>
        </div>
        <div className="col-6 d-flex flex-column justify-content-between">
          <div className="p-1" style={{ flex: 1, ...borderStyle }}>
            <div style={{ fontSize: "0.8em" }}>Booking No</div>
            <div>{blNumber}</div>
          </div>
          <div className="p-1" style={{ flex: 1, ...borderStyle }}>
            <div style={{ fontSize: "0.8em" }}>Export references</div>
          </div>
          <div className="p-1" style={{ flex: 1, ...borderStyle }}>
            <div style={{ fontSize: "0.8em" }}>
              Onward inland routing (Not part of Carriage as defined in clasuse 1. For account and risk of Merchant)
            </div>
          </div>
        </div>
      </div>

      {/* Row 3 */}
      <div className="d-flex">
        <div className="p-2 col-6" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>
            Consignee (negotiable is consiged &quot;to order&quot;, &quot;to order of&quot; a named Person or &quot;to
            order of bearer&quot;)
          </div>
          <div className="p-2 m-2">
            <div>TO THE ORDER OF</div>
            <div>{consignee.name || ""}</div>
          </div>
        </div>
        <div className="p-2 col-6" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Notify Party (see clause 22)</div>
          <div className="p-2 m-2">
            <div>{notifyParty.name || ""}</div>
          </div>{" "}
        </div>
      </div>

      {/* Row 4 */}
      <div className="d-flex">
        <div className="col-3 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Vessel (see clause 1 + 19)</div>
          {document.vessel || ""}
        </div>
        <div className="col-3 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Voyage No.</div>
          {document.voyageNo || ""}
        </div>
        <div className="col-6 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>
            Place of Receipt. Applicable only when document used as Multimodal Transport B/L (see clause 1)
          </div>
        </div>
      </div>

      {/* Row 5 */}
      <div className="d-flex">
        <div className="col-3 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Port of Loading</div>
          {document.portOfLoading || ""}
        </div>
        <div className="col-3 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>Port of Discharge</div>
          {document.portOfDischarge || ""}
        </div>
        <div className="col-6 p-2" style={borderStyle}>
          <div style={{ fontSize: "0.8em" }}>
            Place of Delivery. Applicable only when document used as Multimodal Transport B/L (see clause 1)
          </div>
        </div>
      </div>
    </div>
  );
};

export const BillOfLadingTemplate: FunctionComponent<TemplateProps<BLCertificate>> = ({ document }) => (
  // Section 1
  <div className="container" id="bill-of-lading-template">
    {Section1(document)}
    <br />
    <div className="text-center">
      <strong>PARTICULARS FURNISHED BY SHIPPER</strong>
    </div>
    {Section2(document)}
    <br />
    {Section3()}
  </div>
);
