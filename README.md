# Sales Pipeline simulator

## Tech stack
- Typescript
- React js
- React router V6
- HTML
- CSS
- axios
- axios-mock-adapter
- react-testing-library
- Jest

As the project doesn't have a backend service I decided to mock the data using json files placed on the utils folder, implement all the requests with `axios-mock-adapter` and created some helper functions(setCustomerProperties and customersDb) in order to update and store that data in the browser's localStorage, that way we have updated customers data in al the sessions. There is also a `.env` file where I declared the `REACT_APP_TIMEOUT` with which you can set the time the mocked service is going to take to respond in the validations.

## Explanation
Project where you can simulate a CRM interaction with a sales pipeline, conformed by the `Lead -> Prospect -> Negotiation -> Contract` stages, in which you can run authomatic validations to check if a customer in the Lead stage is eligible to become a Prospect. In the main view we have a List of customers rendered in a custom Table built from scratch using HTML and CSS. Each customer has personal information, that is showed in the columns, and also the Stage(sales pipeline step in which the cutomer is at the moment) and Status(Active or Rejected, to check if a Lead didn't pass the validations). In this main view you can also find a filter button where you can filter according to the stage column:

![sales-pipeline](https://github.com/Diego-Ardila/sales-pipeline/assets/67027844/9a572739-8f71-431c-90b9-d7c88623ec28)

Then we have the Customer by id view where you can check the information of one specific customer, selected from the previous Table, and also if the customer is on the Lead stage, run the following authomatic validations:

- The person should exist in the national registry identification external system and their personal information should match the information stored in our local database.
- The person does not have any judicial records in the national archives' external system.
- An internal prospect qualification system gives a satisfactory score for that person. This system outputs a random score between 0 and 100. A lead could be turned into prospect if the score is greater than 60.

The first two validations are non-dependent between each other. Therefore, both validations run in parallel. The third validation requires the output of the previous systems in order to send that data to the internal prospect qualification system to be executed.

All of them were mocked using `axios-mock-adapter`, and presented as a list above the validations button trigger, and having different styles and icons according to the state of each of them, in order to give feedback to the user inteeracting with the functionality this way:

- All approved:
![sales-pipeline-approved](https://github.com/Diego-Ardila/sales-pipeline/assets/67027844/2294f087-b685-4a0f-8d12-0f90b4b1147f)

- One of the parallel first rejected:
![sales-pipeline-judicial-faill](https://github.com/Diego-Ardila/sales-pipeline/assets/67027844/3a0cc1a9-4819-4fb5-bebf-5f1c1fbd397b)

- the last one rejected:
![sales-pipeline-internal-faill](https://github.com/Diego-Ardila/sales-pipeline/assets/67027844/001f6eb5-94d7-4607-889f-d5c6026f6ecc)

As noticed in the above gifs all the fields react to the changes of states according to the responses received from the mocked services validations, by executing the customer info request at the end of the validations interaction, so everything is working as an application consuming a REST api service. 

## Improvements to be done
- Add pagination and sorting to the Table.
- Improve the error boundaries and error management in each request(create a modal or alert to show them).
- Add a breadcrumb component
- Actions to advance in the next steages after Prospect

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
