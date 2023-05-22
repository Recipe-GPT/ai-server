import { ProxyRecipeService } from "@/domain/recipe/service/proxyRecipeService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";

const generateRecipeByProxy = async (req: RecipeReq): Promise<void> => {
  const res = await ProxyRecipeService.generateRecipe(req);
  console.log(res);
  const text = res.choices[0].message.content;
  console.log(text);
};

export const RecipeService = {
  generateRecipeByProxy
};