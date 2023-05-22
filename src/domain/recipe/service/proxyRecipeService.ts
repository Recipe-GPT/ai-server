import { Prompt } from "@/domain/food/type/prompt";
import { RecipePromptService } from "@/domain/recipe/service/recipePromptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";

const generateRecipe = async (req: RecipeReq): Promise<void> => {
  const payload = getPayload(req);
};
  
const getPayload = (req: RecipeReq) => {
  const prompt: Prompt = RecipePromptService.getUserPrompt(req);
  console.log(prompt);
};

export const ProxyRecipeService = {
  generateRecipe
};
