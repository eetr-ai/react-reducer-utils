# React Reducer Utils

React Reducer Utils is a utility library designed to simplify the management of reducers in React applications. It provides helper functions and patterns to make working with reducers more efficient and less error-prone.

## Installation

To install the library, use npm or yarn:

```bash
npm install react-reducer-utils
```

or

```bash
yarn add react-reducer-utils
```

## Usage

### Setting Up a Reducer

1. Import the utility functions from the library:

```typescript
import { createReducer } from 'react-reducer-utils';
```

2. Define your action types and initial state:

```typescript
type State = {
  count: number;
};

type Action =
  | { type: 'increment' }
  | { type: 'decrement' };

const initialState: State = {
  count: 0,
};
```

3. Use `createReducer` to define your reducer:

```typescript
const reducer = createReducer<State, Action>(initialState, {
  increment: (state) => ({ ...state, count: state.count + 1 }),
  decrement: (state) => ({ ...state, count: state.count - 1 }),
});
```

4. Use the reducer in your React component:

```tsx
import React, { useReducer } from 'react';

const Counter: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>Increment</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>Decrement</button>
    </div>
  );
};

export default Counter;
```

### Using the Simple Provider

The library also includes a `SimpleProvider` component to simplify context management. Here’s how to use it:

1. Import the `SimpleProvider`:

```typescript
import { SimpleProvider } from 'react-reducer-utils';
```

2. Wrap your application with the provider:

```tsx
import React from 'react';
import { SimpleProvider } from 'react-reducer-utils';
import App from './App';

const Root: React.FC = () => (
  <SimpleProvider>
    <App />
  </SimpleProvider>
);

export default Root;
```

3. Access the context in your components:

```tsx
import React, { useContext } from 'react';
import { useSimpleContext } from 'react-reducer-utils';

const MyComponent: React.FC = () => {
  const { state, dispatch } = useSimpleContext();

  return (
    <div>
      <p>State: {JSON.stringify(state)}</p>
      <button onClick={() => dispatch({ type: 'someAction' })}>Dispatch Action</button>
    </div>
  );
};

export default MyComponent;
```

### Example Test Case for Simple Provider

Below is an example test case that demonstrates how to use the `bootstrapProvider` function to create a provider and manage state in a React application. This test case is part of the library's test suite:

```tsx
import { useEffect } from "react";
import type { ReducerAction } from "react-reducer-utils";
import { bootstrapProvider } from "react-reducer-utils";
import { render } from "@testing-library/react";

describe("Simple provider test Suite", () => {

    it("supports bootstrapping the provider", () => {
        
        //we create all the boilerplate and a simple component to test state management.
        enum ActionType {
            TEST = "TEST",
        }

        interface State {
            value: number;
        }

        const initialState: State = {
            value: 0,
        };

        const testFn = jest.fn();

        function reducer(state: State, action: ReducerAction<ActionType>): State {
            switch (action.type) {
                case ActionType.TEST:
                    testFn();
                    return { ...state, value: state.value + 1 };
                default:
                    return state;
            }
        }
        
        const { Provider, useContextAccessors } = bootstrapProvider<State, ReducerAction<ActionType>>(reducer, initialState);

        function TestComponent() {
            const { state, dispatch } = useContextAccessors();

            useEffect(() => {
                // Just to test initial render
                dispatch({ type: ActionType.TEST });
            }, []);

            return (
                <div>
                    <p>Value: {state?.value}</p>
                    <button onClick={() => dispatch({ type: ActionType.TEST })}>Increment</button>
                </div>
            );
        }

        render(<Provider>
            <TestComponent />
        </Provider>);

        expect(testFn).toHaveBeenCalledTimes(1);
    });

});
```

This example illustrates how to:

1. Define a reducer and initial state.
2. Use `bootstrapProvider` to create a provider and accessors.
3. Test state management and actions using React Testing Library.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.