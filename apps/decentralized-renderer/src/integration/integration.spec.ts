import { Selector } from "testcafe";
import { blCertificate } from "../templates/sample";
import percySnapshot from "@percy/testcafe";

// assign certificate to a variable otherwise there is an error ... ReferenceError: sample_1 is not defined
const document = {
  ...blCertificate,
  $template: { name: "BILL_OF_LADING", type: "EMBEDDED_RENDERER", url: "http://localhost:3000" }
};
fixture("Custom Red Certificate Template").page`http://localhost:3000`;

const CustomTemplate = Selector("#bill-of-lading-template");

test("Custom certificate is rendered correctly", async test => {
  await test.eval(
    () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
      // @ts-ignore can't find a way to have thos working on test cafe
      window.openAttestation({
        type: "RENDER_DOCUMENT",
        payload: {
          document
        }
      });
    },
    {
      dependencies: {
        document
      }
    }
  );
  // test the title is displayed
  await test.expect(CustomTemplate.visible).ok();
  await test
    .expect(CustomTemplate.find(".text-center").find("strong").textContent)
    .contains("PARTICULARS FURNISHED BY SHIPPER");

  // take a snapshot
  await percySnapshot(test, "Rendered custom template");
});
