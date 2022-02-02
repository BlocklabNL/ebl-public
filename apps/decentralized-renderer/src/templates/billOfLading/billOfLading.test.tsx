import { BillOfLadingTemplate } from "./billOfLadingTemplate";
import { blCertificate } from "../sample";
import { render } from "@testing-library/react";
import React from "react";

describe("customTemplate", () => {
  it("should render", () => {
    const { queryByText } = render(<BillOfLadingTemplate document={blCertificate} handleObfuscation={() => void 0} />);

    expect(queryByText("PARTICULARS FURNISHED BY SHIPPER")).not.toBeNull();
  });
  it("should render with vessel name", () => {
    const { queryByText } = render(
      <BillOfLadingTemplate document={{ ...blCertificate, vessel: "hello world" }} handleObfuscation={() => void 0} />
    );

    expect(queryByText("hello world")).not.toBeNull();
  });
});
