import { Prompt } from "@/infrastructure/prompt/type/prompt";

export interface OpenAiModelRawRes {
  choices: [
    {message: Prompt}
  ]
}