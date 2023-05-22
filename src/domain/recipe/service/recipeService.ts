import { ProxyRecipeService } from "@/domain/recipe/service/proxyRecipeService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";

const generateRecipeByProxy = async (req: RecipeReq): Promise<void> => {
  const res = await ProxyRecipeService.generateRecipe(req);
};

export const RecipeService = {
  generateRecipeByProxy
};