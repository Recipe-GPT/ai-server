import { Condiments } from "@/domain/generate/type/condiments";
import { Ingredients } from "@/domain/generate/type/ingredient";

export interface GenerateRes {
  name: string,
  description: string,
  ingredients: Ingredients,
  condiments: Condiments
}