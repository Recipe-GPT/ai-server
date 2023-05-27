import { RECIPE_MOCK_RESPONSE, RECIPE_PROMPT } from "@/.prompt.env";
import { PolicyService } from "@/domain/policy/service/policyService";
import { RecipePromptService } from "@/domain/recipe/service/recipePromptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";
import { RecipeRes } from "@/domain/recipe/type/recipeRes";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { OpenAiApiService } from "@/infrastructure/openai/openAiApiService";
import { OpenAiProxyService } from "@/infrastructure/openai/openAiProxyService";
import { PromptService } from "@/infrastructure/prompt/promptService";
import { Prompt } from "@/infrastructure/prompt/type/prompt";

const generateRecipeByMockData = () => {
  const text = RECIPE_MOCK_RESPONSE;
  return RecipePromptService.parseAiResponse(text);
}

const generateRecipeByOpenAiApi = async (req: RecipeReq): Promise<RecipeRes> => {
  await PolicyService.contentPolicyCheck(
    PromptService.encodeName(req.name),
    PromptService.encodeDescription(req.description),
    PromptService.encodeIngredients(req.ingredients),
    PromptService.encodeSeasonings(req.seasonings)
  );
  
  if (!RECIPE_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  const prompts: Prompt[] = RECIPE_PROMPT.concat(
    RecipePromptService.getUserPrompt(req)
  );
  
  const text = await OpenAiApiService.generate(prompts);
  return RecipePromptService.parseAiResponse(text);
};

const generateRecipeByProxy = async (req: RecipeReq): Promise<RecipeRes> => {
  await PolicyService.contentPolicyCheck(
    PromptService.encodeName(req.name),
    PromptService.encodeDescription(req.description),
    PromptService.encodeIngredients(req.ingredients),
    PromptService.encodeSeasonings(req.seasonings)
  );
  
  if (!RECIPE_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  const prompts: Prompt[] = RECIPE_PROMPT.concat(
    RecipePromptService.getUserPrompt(req)
  );
  
  const text = await OpenAiProxyService.generate(prompts);
  return RecipePromptService.parseAiResponse(text);
};

export const RecipeService = {
  generateRecipeByMockData,
  generateRecipeByOpenAiApi,
  generateRecipeByProxy
};