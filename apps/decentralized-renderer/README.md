# decentralized-renderer-react-template

Decentralized renderer for Bill of Lading documents.

## Install

```sh
$ npm install
```

Make sure to edit the following files according to your module's info:
- add your own template (in `src/templates` folder) and configure correctly the template registry (in `src/templates/index.tsx` file)

## Deploy

Make sure you are authenticated through the `gcloud` cli tool and you have selected the right project (`blocklab-ebl`).

```sh
$ gcloud app deploy
```

## Commands

```sh
$ npm run storybook # open storybook and start editing your components
$ npm run storybook:build # generate docs
$ npm run test:watch # run tests with Jest
$ npm run test:coverage # run tests with coverage
$ npm run integration # run integration test with testcafe
$ npm run lint # lint code
$ npm run build # build component
$ npm run example:application # start embedded application
```

## Code organization and development

- `index.ts` contains the logic to communicate with the host embedding your renderer. You probably will _never_ need to update that file.
- template registry configuration is located in `src/templates/index.tsx`
- templates are located in `src/templates` folder. You can add as many template as you want and structure the code the way you want
- documents samples contains fake data to test the templates you build. You can create a typescript interface to make sure that your template uses the correct expected document
  - create a type describing the kind of document you expect to render (for instance check `CustomTemplateCertificate` in `src/sample.tsx`)
  - create a template consuming that interface, using the `TemplateProps` helper from `@govtechsg/decentralized-renderer-react-components (for instance check the template in`src/templates/customTemplate/customTemplate.tsx`)
- shared components are located in `src/core` folder. For instance you can find a watermark example that will be displayed when printing the document
- feel free to remove whatever you dont need

## Testing the templates in an integrated environment

This template provides a simple application that is able to render documents built for the current renderer. To use it:
1. Open `application/index.tsx` file and edit the `documents` property of the `App` component to suit your needs (provide any document that is available locally, whether it's a javascript, JSON or typescript document).
1. Start your renderer: `npm run dev`
1. Start the local application: `npm run example:application`
1. Head to `http://localhost:3010/`, you should see the configured documents during step 1.

## End-to-end and visualisation test

This repository has been configured to run end-to-end tests using `Testcafe`. Visualisation testing is also configured through `Percy` and tests are ran through `Testcafe`.

To setup `Percy`, you will need a token that you can find on Percy's dashboard:
- For local development, type `export PERCY_TOKEN=<PERCY_TOKEN>` before running `npm run integration`.
- For [**CircleCI**](https://docs.percy.io/docs/circleci), add an environment variable `PERCY_TOKEN` with the token value.

## License

GPL-3.0
