/*
MIT License

Copyright (c) 2025 Eetr Culinary Insights

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/
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