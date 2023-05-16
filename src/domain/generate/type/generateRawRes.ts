import { Prompt } from "@/domain/generate/type/prompt";

export interface GenerateRawRes {
  choices: [
    {message: Prompt}
  ]
}