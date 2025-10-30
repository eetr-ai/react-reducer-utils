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
import type { Context, Dispatch, ReactNode } from "react";
import { createContext, useReducer } from "react";
import { useContextNullSafe } from "../utils/reducer-utils";

/**
 * Parameters for SimpleProvider
 */
export interface SimpleProviderParams<T, U> {
    stateContext: Context<T | null>;
    dispatchContext: Context<Dispatch<U> | null>;
    initialState: T;
    reducer: (state: T, action: U) => T;
    children: ReactNode;
}

/**
 * Main Component to provide state and dispatch contexts
 * @template T State type
 * @template U Action type
 * @param params all the necesssary elements to bootstrap this provider.
 * @returns A component that renders the provider correctly.
 */
export function SimpleProvider<T, U>(params: SimpleProviderParams<T, U>) {

    const [masterState, masterDispatch] = useReducer(params.reducer, params.initialState);

    return (<params.stateContext.Provider value={masterState}>
        <params.dispatchContext.Provider value={masterDispatch}>
            {params.children}
        </params.dispatchContext.Provider>
    </params.stateContext.Provider>);
}

/**
 * Simple function to bootstrap the provider and the conext accessors.
 * @template T State type
 * @template U Action type
 * @param reducer the reducer for state management.2
 * @param initialState the initial state for the provider.
 * @returns an object containing the Provider component and the context accessors.
 */
export function bootstrapProvider<T, U>(reducer: (state: T, action: U) => T, initialState: T) {
    const stateContext = createContext<T | null>(null);
    const dispatchContext = createContext<Dispatch<U> | null>(null);

    function useContextAccessors() {
        const state = useContextNullSafe(stateContext);
        const dispatch = useContextNullSafe(dispatchContext);
        return { state, dispatch };
    }

    const Provider = ({ children }: { children: ReactNode }) => {
        return (
            <SimpleProvider
                stateContext={stateContext}
                dispatchContext={dispatchContext}
                initialState={initialState}
                reducer={reducer}
            >
                {children}
            </SimpleProvider>
        );
    };

    return { Provider, useContextAccessors };
}