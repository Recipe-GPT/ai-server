import { RECIPE_MOCK_RESPONSE } from "@/.prompt.env";
import { ProxyRecipeService } from "@/domain/recipe/service/proxyRecipeService";
import { RecipePromptService } from "@/domain/recipe/service/recipePromptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";
import { RecipeRes } from "@/domain/recipe/type/recipeRes";

const generateRecipeByProxy = async (req: RecipeReq): Promise<RecipeRes> => {
  const res = await ProxyRecipeService.generateRecipe(req);
  const text = res.choices[0].message.content;
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