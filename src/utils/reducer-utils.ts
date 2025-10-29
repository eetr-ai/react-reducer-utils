import type { Context } from "react";
import { useContext } from "react";

export class ReducerAction<T> {
    type: T;
    data?: any;

    constructor(type: T, data?: any) {
        this.type = type;
        this.data = data;
    }
}

export function useContextNullSafe<T>(context: Context<T | null>) : T {
    const result = useContext(context);
    if (result == null) {
        throw new Error("Out of context");
    }
    return result;
}