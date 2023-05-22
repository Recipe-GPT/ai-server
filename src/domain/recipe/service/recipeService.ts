import { ProxyRecipeService } from "@/domain/recipe/service/proxyRecipeService";
import { RecipePromptService } from "@/domain/recipe/service/recipePromptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";
import { RecipeRes } from "@/domain/recipe/type/recipeRes";

const generateRecipeByProxy = async (req: RecipeReq): Promise<RecipeRes> => {
  const res = await ProxyRecipeService.generateRecipe(req);
  console.log(res);
  const text = res.choices[0].message.content;
  console.log(text);
  return RecipePromptService.parseAiResponse(text);
};

export const RecipeService = {
  generateRecipeByProxy
};