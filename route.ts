const baseUrl = Cypress.env("apiUrl");

const routes = {
  csv_import: `${baseUrl}v1/csv_upload_detail/import_csv`
};

export default routes;
