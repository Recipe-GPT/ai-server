import { Prompt } from "@/domain/food/type/prompt";
import { PromptService } from "@/domain/food/service/promptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";

const getUserPrompt = (req: RecipeReq) => {
  const prompt: Prompt = {
    role: 'user',
    content: `${PromptService.getNamePrompt(req.name)}
${PromptService.getDescriptionPrompt(req.description)}
${PromptService.getIngredientsPrompt(req.ingredients)}
${PromptService.getSeasoningsPrompt(req.seasonings)}`
  };

  return prompt;
};

export const RecipePromptService = {
  getUserPrompt
};
