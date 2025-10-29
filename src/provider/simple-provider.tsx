import type { Context, Dispatch, ReactNode } from "react";
import { useReducer } from "react";

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
export default function SimpleProvider<T, U>(params: SimpleProviderParams<T, U>) {

    const [masterState, masterDispatch] = useReducer(params.reducer, params.initialState);

    return (<params.stateContext.Provider value={masterState}>
        <params.dispatchContext.Provider value={masterDispatch}>
            {params.children}
        </params.dispatchContext.Provider>
    </params.stateContext.Provider>);
}

