import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { Prompt } from "@/domain/food/type/prompt";
import { ERROR_CHECK_SIGN, RECOMMEND_REGEX } from "@/.prompt.env";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";
import ConflictException from "@/global/error/exceptions/conflictException";
import { PromptService } from "@/domain/food/service/promptService";

const getUserPrompt = (req: RecommendReq): Prompt => {
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
      ingredients: PromptService.parseItems(match[3]),
      seasonings: PromptService.parseItems(match[4])
    }
    resList.push(res);
  }
  return resList;
}

export const RecommendPromptService = {
  getUserPrompt,
  parseAiResponse
};
