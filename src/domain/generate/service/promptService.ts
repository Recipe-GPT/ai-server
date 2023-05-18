import { GenerateReq } from "@/domain/generate/type/generateReq";
import { Prompt } from "@/domain/generate/type/prompt";
import { Ingredients } from "@/domain/generate/type/ingredient";
import { Seasonings } from "@/domain/generate/type/seasoning";
import { ERROR_CHECK_SIGN, FOOD_REGEX } from "@/.prompt.env";
import { GenerateRes } from "@/domain/generate/type/generateRes";
import ConflictException from "@/global/error/exceptions/conflictException";

const getUserPrompt = (req: GenerateReq) => {
  const prompt: Prompt = {
    role: 'user',
    content: `${getIngredientsPrompt(req.ingredients)}\n${getSeasoningsPrompt(req.seasonings)}`
  };

  return prompt;
};

const getIngredientsPrompt = (ingredients: Ingredients): string => 
  `재료('${ingredients.join("' + '")}')`;

const getSeasoningsPrompt = (seasonings: Seasonings): string => 
  `양념('${seasonings.join("' + '")}')`;

const parseAiResponse = (text: string): GenerateRes[] => {
  if (isError(text)) {
    const errorMessage = text.split(ERROR_CHECK_SIGN)[1].trim();
    throw new ConflictException(errorMessage);
  }
  
  // AI의 답변 구조가 약간 다를 수 있기 때문에 답변을 보정해줌.
  text += '\n';

  let match: RegExpExecArray | null = null;
  const resList: GenerateRes[] = [];

  while ((match = FOOD_REGEX.exec(text)) !== null) {
    const res: GenerateRes = {
      name: match[1],
      description: match[2],
      ingredients: match[3].slice(1, -1).split("', '"),
      seasonings: match[4].slice(1, -1).split("', '")
    }
    resList.push(res);
  }
  return resList;
}

const isError = (text: string): boolean => {
  return text.includes(ERROR_CHECK_SIGN);
}

const PromptService = {
  getUserPrompt,
  parseAiResponse
}

export default PromptService;
