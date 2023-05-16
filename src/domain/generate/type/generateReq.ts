import { Condiments } from "@/domain/generate/type/condiments";
import { Ingredients } from "@/domain/generate/type/ingredient";

export interface GenerateReq {
  ingredients: Ingredients,
  condiments: Condiments
}