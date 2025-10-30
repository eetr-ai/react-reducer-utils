# React Reducer Utils

React Reducer Utils is a utility library designed to simplify the management of reducers in React applications. It provides helper functions and patterns to make working with reducers more efficient and less error-prone.

## Installation

To install the library, use npm or yarn:

```bash
npm install @eetr/react-reducer-utils
```

or

```bash
yarn add @eetr/react-reducer-utils
```

## Usage

The process involves creating some boilerplate but I have built utility functions and classes to make it simple and maintainable. But sometimes there is a necessity for a more advanced use.

### Simple Version

```tsx
import { ReducerAction, bootstrapProvider } from "@eetr/react-reducer-utils";

//step 1 define your action types.
export enum SimpleActionType {
    INCREMENT = 'INCREMENT',
    DECREMENT = 'DECREMENT',
    RESET = 'RESET'
}

//step 2, define your state.
export interface SimpleState {
    count: number;
}

//step 3, define your initial state.
const initialState: SimpleState = {
    count: 0
};

//step 4, define your reducer.
function reducer(state: SimpleState = initialState, action: ReducerAction<SimpleActionType>): SimpleState {
    switch (action.type) {
        case SimpleActionType.INCREMENT:
            return { count: state.count + 1 };
        case SimpleActionType.DECREMENT:
            return { count: state.count - 1 };
        case SimpleActionType.RESET:
            return { count: 0 };
        default:
            return state;
    }
}

//step 5, bootstrap your provider and export it for further use.
const {Provider, useContextAccessors} = bootstrapProvider<SimpleState, ReducerAction<SimpleActionType>>(reducer, initialState);

export { Provider as CounterProvider, useContextAccessors as useCounterState };
```

You can then use the provider and contextAccessors in the following way:

```tsx
"use client";

import { SimpleActionType, useCounterState } from "./context";

export default function CounterComponent() {
    const { state, dispatch } = useCounterState();

    return (
        <div className="flex flex-col w-96 items-center">
            <div>This is a counter component. Count: {state.count}</div>
            <button onClick={() => dispatch({ type: SimpleActionType.INCREMENT })}>Increment</button>
            <button onClick={() => dispatch({ type: SimpleActionType.DECREMENT })}>Decrement</button>
            <button onClick={() => dispatch({ type: SimpleActionType.RESET })}>Reset</button>
        </div>
    );
}
```

And for it to work you must wrap your component around its context.

```tsx
export default function reducersPage() {
  return (<main>
    <div className="flex flex-col items-center mt-48">
        <h1 className="text-2xl font-bold">Reducers Test</h1>
        <CounterProvider>
            <CounterComponent />
        </CounterProvider>
    </div>
  </main>);
```


## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for details.