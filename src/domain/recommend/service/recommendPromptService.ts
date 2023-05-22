import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { Prompt } from "@/domain/food/type/prompt";
import { ERROR_CHECK_SIGN, RECOMMEND_REGEX, ITEM_DELIMITER, ITEM_DELIMITER_PREFIX, ITEM_DELIMITER_SUFFIX } from "@/.prompt.env";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";
import ConflictException from "@/global/error/exceptions/conflictException";
import { PromptService } from "@/domain/food/service/promptService";

const getUserPrompt = (req: RecommendReq) => {
  const prompt: Prompt = {
    role: 'user',
    content: `${PromptService.getIngredientsPrompt(req.ingredients)}
${PromptService.getSeasoningsPrompt(req.seasonings)}`
  };

  return prompt;
};

const parseAiResponse = (text: string): RecommendRes[] => {
  if (PromptService.isError(text)) {
    const errorMessage = text.split(ERROR_CHECK_SIGN)[1].trim();
    throw new ConflictException(errorMessage);
  }
  
  // AI의 답변 구조가 약간 다를 수 있기 때문에 답변을 보정해줌.
  text += '\n';

  let match: RegExpExecArray | null = null;
  const resList: RecommendRes[] = [];

  while ((match = RECOMMEND_REGEX.exec(text)) !== null) {
    const res: RecommendRes = {
      name: match[1],
      description: match[2],
      ingredients: match[3].slice(ITEM_DELIMITER_PREFIX.length, -(ITEM_DELIMITER_SUFFIX.length))
                           .split(ITEM_DELIMITER)
                           .filter(s => s),
      seasonings: match[4].slice(ITEM_DELIMITER_SUFFIX.length, -(ITEM_DELIMITER_SUFFIX.length))
                          .split(ITEM_DELIMITER)
                          .filter(s => s)
    }
    resList.push(res);
  }
  return resList;
}

export const RecommendPromptService = {
  getUserPrompt,
  parseAiResponse
};
