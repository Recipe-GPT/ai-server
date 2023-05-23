import { RECIPE_MOCK_RESPONSE, RECIPE_PROMPT } from "@/.prompt.env";
import { RecipePromptService } from "@/domain/recipe/service/recipePromptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";
import { RecipeRes } from "@/domain/recipe/type/recipeRes";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { OpenAiProxyService } from "@/infrastructure/openai/openAiProxyService";
import { Prompt } from "@/infrastructure/prompt/type/prompt";

const generateRecipeByProxy = async (req: RecipeReq): Promise<RecipeRes> => {
  if (!RECIPE_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  const prompt: Prompt = RecipePromptService.getUserPrompt(req);
  const prompts: Prompt[] = RECIPE_PROMPT.concat(prompt);
  
  const text = await OpenAiProxyService.generate(prompts);
  return RecipePromptService.parseAiResponse(text);
};

const generateRecipeByMockData = () => {
  const text = RECIPE_MOCK_RESPONSE;
  return RecipePromptService.parseAiResponse(text);
}

export const RecipeService = {
  generateRecipeByProxy,
  generateRecipeByMockData
};