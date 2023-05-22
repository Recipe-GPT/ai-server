import { Prompt } from "@/domain/food/type/prompt";

export interface OpenAiModelRawRes {
  choices: [
    {message: Prompt}
  ]
}