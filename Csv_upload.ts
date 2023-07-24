import routes from "../../support/route";

describe(`Test case for csv_upload`, () => {
  it(`Success test case for csv_upload`, () => {
    let allmodules = [
      "body",
      "category",
      "color",
      "customer_store",
      "customers",
      "design",
      "division",
      "factor",
      "group"
    ];
    allmodules.forEach((value) => {
      cy.fixture(value + ".csv").then((binary) => {
        const filedata = Cypress.Blob.binaryStringToBlob(binary, "text/csv");
        const formData = new FormData();
        formData.set("csv", filedata);
        formData.set("module", value);
        cy.postFormData(
          routes.csv_import,
          formData,
          Cypress.env("companyToken")
        ).then((body) => {
          cy.log(JSON.stringify(value))
          expect(body.data).has.property("statusCode", 200);
          expect(body.data).has.property("success", true);
          expect(body.data).has.property("error", null);
          expect(body.data).has.property("result");
          expect(body.data.result).has.property("message");
          expect(body.data.result.data).has.property("id");
        })
      });
    });
  });
