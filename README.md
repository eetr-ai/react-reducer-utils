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

The process involves creating some boilerplate but I have built utility functions and classes to make it simple and maintainable. But sometimes there is a necessity for a more advanced use.

### Simple Version

```tsx

//step 1 define your reducer actions

export enum SimpleReducerActionType {
    increaseCounter,
    decreaseCounter,
}

//step 2 define your state object and initial state
export interface SimpleComponentState {
    count: number
}

const initialState = { count: 0 }

//step 3 define your reducer and add logic
function myReducer(state: SimpleComponentState, action: ReducerAction<SimpleReducerActionType>): SimpleComponentState {
    switch (action.type) {
        case SimpleReducerActionType.increaseCounter:
            return {count: state.count + 1};
        case SimpleReducerActionType.decreaseCounter:
            return {count: state.count - 1};
        default:
            ///keep the component pure
            return {...state};
    }
}

//step 4 bootstrap the boilerplate and export the components
const [SimpleStateProvider, useSimpleState] = bootstrapProvider<SimpleComponentState, ReducerAction<SimpleReducerActionType>>(myReducer, initialState);
 

//step 5 export the provider and simple state so it can be used outside

export SimpleStateProvider;
export useSimpleState;

```

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