import type { Context } from "react";
import { useContext } from "react";
import type { EnumType } from "typescript";

/**
 * A type that represents an action for a reducer.
 * This class encapsulates the action type and optional data payload, and it enforces a typical structure
 * for actions used in reducer functions.
 *
 * @template T The type of the action.
 */
export interface ReducerAction<T extends EnumType | string> {
    type: T,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data?: any
}

export function useContextNullSafe<T>(context: Context<T | null>) : T {
    const result = useContext(context);
    if (result == null) {
        throw new Error("Out of context");
    }
    return result;
}