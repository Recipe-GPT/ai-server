import { Prompt } from "@/infrastructure/prompt/type/prompt";
import { PromptService } from "@/infrastructure/prompt/promptService";
import { RecipeReq } from "@/domain/recipe/type/recipeReq";
import { RecipeRes } from "@/domain/recipe/type/recipeRes";
import { RECIPE_REGEX } from "@/.prompt.env";
import ConflictException from "@/global/error/exceptions/conflictException";

const getUserPrompt = (req: RecipeReq): Prompt => {
  const prompt: Prompt = {
    role: 'user',
    content: [
      PromptService.encodeName(req.name),
      PromptService.encodeDescription(req.description),
      PromptService.encodeIngredients(req.ingredients),
      PromptService.encodeSeasonings(req.seasonings)
    ].join('\n')
  };
  return prompt;
};

const parseAiResponse = (text: string): RecipeRes => {
  if (PromptService.isError(text)) {
    throw new ConflictException(
      PromptService.parseErrorMessage(text)
    );
  }
  
  // AI의 답변 구조가 약간 다를 수 있기 때문에 답변을 보정해줌.
  text += '\n';

  let match = RECIPE_REGEX.exec(text);
  if (match === null) throw new ConflictException('AI가 레시피를 생성하는데 실패하였습니다. 다시 시도해주세요.');
  
  const res: RecipeRes = {
    ingredients: PromptService.parseItems(match[1]),
    seasonings: PromptService.parseItems(match[2]),
    recipe: match[3].split('\n')
                    .filter(s => s)
  }
  return res;
}

export const RecipePromptService = {
  getUserPrompt,
  parseAiResponse
};
