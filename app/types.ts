import { RawDraftContentState } from "draft-js";

export type task = {
  id?: number;
  rawContentState: RawDraftContentState;
};
