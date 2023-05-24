import { RECOMMEND_MOCK_RESPONSE, RECOMMEND_PROMPT } from "@/.prompt.env";
import { RecommendPromptService } from "@/domain/recommend/service/recommendPromptService";
import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { Prompt } from "@/infrastructure/prompt/type/prompt";
import { OpenAiProxyService } from "@/infrastructure/openai/openAiProxyService";
import { PolicyService } from "@/domain/policy/service/policyService";
import { PromptService } from "@/infrastructure/prompt/promptService";

const recommendByProxy = async (req: RecommendReq): Promise<RecommendRes[]> => {
  await PolicyService.contentPolicyCheck(
    PromptService.encodeIngredients(req.ingredients),
    PromptService.encodeSeasonings(req.seasonings)
  );

  if (!RECOMMEND_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  const prompts: Prompt[] = RECOMMEND_PROMPT.concat(
    RecommendPromptService.getUserPrompt(req)
  );
  
  const text = await OpenAiProxyService.generate(prompts);
  return RecommendPromptService.parseAiResponse(text);
};

const recommendByMockData = (): RecommendRes[] => {
  const text = RECOMMEND_MOCK_RESPONSE;
  return RecommendPromptService.parseAiResponse(text);
};

export const RecommendService = {
  recommendByProxy,
  recommendByMockData
};