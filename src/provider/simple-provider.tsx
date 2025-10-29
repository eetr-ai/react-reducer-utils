import type { Context, Dispatch, ReactNode } from "react";
import { useReducer } from "react";

export interface SimpleProviderParams<T, U> {
    stateContext: Context<T | null>;
    dispatchContext: Context<Dispatch<U> | null>;
    initialState: T;
    reducer: (state: T, action: U) => T;
    children: ReactNode;
}

export default function SimpleProvider<T, U>(params: SimpleProviderParams<T, U>) {

    const [masterState, masterDispatch] = useReducer(params.reducer, params.initialState);

    return (<params.stateContext.Provider value={masterState}>
        <params.dispatchContext.Provider value={masterDispatch}>
            {params.children}
        </params.dispatchContext.Provider>
    </params.stateContext.Provider>);
}