import axios, { AxiosResponse } from "axios";
import routes from "../support/route";

export {};
declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      postFormData(
        url: string,
        formData: FormData,
        token: string
      ): Chainable<AxiosResponse>;
    }
  }
}

Cypress.Commands.add("postFormData",
  (url, formData, token): Cypress.Chainable<any> => {
    return cy.wrap(
      axios(url, {
        method: "POST",
        url: routes.csv_import,
        data: formData,
        headers: {
          Authorization: token,
          "Content-Type": "multipart/form-data"
        }
      }));
  });

