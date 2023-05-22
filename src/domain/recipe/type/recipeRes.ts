import { Seasonings } from "@/domain/food/type/seasoning";
import { Ingredients } from "@/domain/food/type/ingredient";

export interface RecipeRes {
  ingredients: Ingredients,
  seasonings: Seasonings,
  recipe: string[]
}