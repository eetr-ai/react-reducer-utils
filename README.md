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

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.