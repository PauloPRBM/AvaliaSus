import { Comment } from "./Comment";
import { Hospital } from "./Hospital";

export interface HospitalWithComments extends Hospital {
  comments: Comment[]
}