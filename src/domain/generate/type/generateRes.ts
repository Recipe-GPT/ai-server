import { Seasonings } from "@/domain/generate/type/seasoning";
import { Ingredients } from "@/domain/generate/type/ingredient";

export interface GenerateRes {
  name: string,
  description: string,
  ingredients: Ingredients,
  seasonings: Seasonings
}