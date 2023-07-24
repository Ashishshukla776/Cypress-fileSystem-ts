import routes from "../../support/route";

describe(`Test case for csv_upload`, () => {
  it(`Success test case for csv_upload`, () => {
      cy.fixture("color.csv").then((binary) => {    // csv file will come from Fixture folder of your poject
        const filedata = Cypress.Blob.binaryStringToBlob(binary, "text/csv");
        const formData = new FormData();
        formData.set("csv", filedata);
        formData.set("module", color);
        cy.postFormData(
          routes.csv_import, //url
          formData,  //body
          Cypress.env("auth-token") // Auth-token
        ).then((body) => {
          cy.log(JSON.stringify(body))
          expect(body.data).has.property("statusCode", 200);
          expect(body.data).has.property("success", true);
          expect(body.data).has.property("error", null);
          expect(body.data).has.property("result");
          expect(body.data.result).has.property("message");
          expect(body.data.result.data).has.property("id");
        })
      });
  });
})
