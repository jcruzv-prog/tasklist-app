import { RawDraftContentState } from "draft-js";

export type task = {
  id?: string;
  rawContentState: RawDraftContentState;
};
