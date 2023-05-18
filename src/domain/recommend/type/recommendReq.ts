import { Seasonings } from "@/domain/food/type/seasoning";
import { Ingredients } from "@/domain/food/type/ingredient";

export interface RecommendReq {
  ingredients: Ingredients,
  seasonings: Seasonings
}