import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { Prompt } from "@/domain/food/type/prompt";
import { Ingredients } from "@/domain/food/type/ingredient";
import { Seasonings } from "@/domain/food/type/seasoning";
import { ERROR_CHECK_SIGN, FOOD_REGEX, ITEM_DELIMITER, ITEM_DELIMITER_PREFIX, ITEM_DELIMITER_SUFFIX } from "@/.prompt.env";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";
import ConflictException from "@/global/error/exceptions/conflictException";

const getUserPrompt = (req: RecommendReq) => {
  const prompt: Prompt = {
    role: 'user',
    content: `${getIngredientsPrompt(req.ingredients)}\n${getSeasoningsPrompt(req.seasonings)}`
  };

  return prompt;
};

const getIngredientsPrompt = (ingredients: Ingredients): string => 
  `재료(${ITEM_DELIMITER_PREFIX}${ingredients.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const getSeasoningsPrompt = (seasonings: Seasonings): string => 
  `양념(${ITEM_DELIMITER_PREFIX}${seasonings.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const parseAiResponse = (text: string): RecommendRes[] => {
  if (isError(text)) {
    const errorMessage = text.split(ERROR_CHECK_SIGN)[1].trim();
    throw new ConflictException(errorMessage);
  }
  
  // AI의 답변 구조가 약간 다를 수 있기 때문에 답변을 보정해줌.
  text += '\n';

  let match: RegExpExecArray | null = null;
  const resList: RecommendRes[] = [];

  while ((match = FOOD_REGEX.exec(text)) !== null) {
    const res: RecommendRes = {
      name: match[1],
      description: match[2],
      ingredients: match[3].slice(ITEM_DELIMITER_PREFIX.length, -(ITEM_DELIMITER_SUFFIX.length))
                           .split(ITEM_DELIMITER),
      seasonings: match[4].slice(ITEM_DELIMITER_SUFFIX.length, -(ITEM_DELIMITER_SUFFIX.length))
                          .split(ITEM_DELIMITER)
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
