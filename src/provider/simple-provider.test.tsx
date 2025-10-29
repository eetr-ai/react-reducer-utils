import { useEffect } from "react";
import type { ReducerAction } from "../utils/reducer-utils";
import { bootstrapProvider } from "./simple-provider";
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