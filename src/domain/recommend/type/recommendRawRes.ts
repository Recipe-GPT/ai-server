import { Prompt } from "@/domain/food/type/prompt";

export interface RecommendRawRes {
  choices: [
    {message: Prompt}
  ]
}