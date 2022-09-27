import { VoteCard } from "./voteCard.model";

export interface VoteSystem {
    id: string;
    name: string;
    values: Array<number>
}