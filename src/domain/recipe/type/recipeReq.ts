import { Seasonings } from "@/domain/food/type/seasoning";
import { Ingredients } from "@/domain/food/type/ingredient";

export interface RecipeReq {
  name: string,
  description: string,
  ingredients: Ingredients,
  seasonings: Seasonings
}