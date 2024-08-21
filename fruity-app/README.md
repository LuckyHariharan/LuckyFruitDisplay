## Overview

The Fruity Selector App allows users to select fruits from a list, group them by various categories (Family, Order, Genus), and add them to a jar. The app calculates the total calories for the selected fruits and provides a detailed nutritional breakdown.

## Running the App

1. Clone the repository.
2. Navigate to the fruity-app using 'cd fruity-app'
3. Install dependencies using `npm install`.
4. Build the app using `npm run build`.
5. Start the development server with `npm start`.

### Features

- **Group By**: Group fruits by Family, Order, or Genus, or display them in a flat list.
- **Add Fruits**: Add individual fruits or entire groups to your jar.
- **Nutrition Breakdown**: View a detailed breakdown of the nutritional content of all fruits in your jar.
- **Remove Fruits**: Remove individual fruits or clear the entire jar.
- **Styling**: The app is styled using TailwindCSS and includes animations powered by Framer Motion.

## State Management

### Context API

The app uses the Context API to manage the state of selected fruits and their total nutritional values. This approach was chosen for its simplicity and suitability for this use case, where global state management is needed across multiple components.

#### Benefits of Context API:

- **Simplicity**: Easy to set up and use, especially for small to medium-sized applications.
- **No Boilerplate**: Unlike more complex state management solutions, Context API requires minimal boilerplate.
- **Built into React**: No need for external libraries, reducing the bundle size and avoiding potential compatibility issues.

### Alternatives Considered

#### **Redux**

Redux is a popular state management library often used in larger applications. It provides a more structured approach to managing state but requires more setup and boilerplate code compared to Context API.

- **Pros**: More scalable than Context API
- **Cons**: More complex, more boilerplate, and often overkill for smaller applications.

## Unit Testing

Unit tests were written using Jest and React Testing Library to ensure code qualtity.
The reducer was tested thoroughly to validate its handling of key operations such as adding, removing, and updating the quantity of fruits in the jar.
To run the tests, use the command:

`npm run test`
`a` -- to run all tests

Thank you for the opportunity to work on this project! I had a blast and look forward to hearing your feedback!
Lucky Hariharan
