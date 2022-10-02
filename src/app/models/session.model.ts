import { VoteSystem } from "./voteSystem.model";

export interface Session {
    id?: string;
    voteSystem?: VoteSystem;
    name?: string;
    reset?: boolean;
  }