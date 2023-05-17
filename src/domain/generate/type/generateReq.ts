import { Seasonings } from "@/domain/generate/type/seasoning";
import { Ingredients } from "@/domain/generate/type/ingredient";

export interface GenerateReq {
  ingredients: Ingredients,
  seasonings: Seasonings
}