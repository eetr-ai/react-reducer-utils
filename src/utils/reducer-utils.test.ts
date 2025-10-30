import type { ReducerAction } from "./reducer-utils";

describe("Utilities test suite", () => {


    it("Supports enum action types", () => {
        
        enum ActionType {
            TEST,
        }

        const action: ReducerAction<ActionType> = {
            type: ActionType.TEST,
            data: { some: "data" },
        };

        expect(action.type).toBe(ActionType.TEST);
        expect(action.data).toEqual({ some: "data" });

    });
});