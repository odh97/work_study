import { Operation, Range } from "slate";
import { isPlainObject } from "@/lib/utilsJS";

interface Batch {
  operations: Operation[];
  selectionBefore: Range | null;
}

export interface History {
  redos: Batch[];
  undos: Batch[];
}

// eslint-disable-next-line no-redeclare
export const History = {
  /**
   * Check if a value is a `History` object.
   */

  isHistory(value: any): value is History {
    return (
      isPlainObject(value) &&
      Array.isArray(value.redos) &&
      Array.isArray(value.undos) &&
      (value.redos.length === 0 ||
        Operation.isOperationList(value.redos[0].operations)) &&
      (value.undos.length === 0 ||
        Operation.isOperationList(value.undos[0].operations))
    );
  },
};
