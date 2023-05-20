import { FOOD_RECOMMEND_MOCK_RESPONSE } from "@/.prompt.env";
import PromptService from "@/domain/recommend/service/promptService";
import { recommend } from "@/domain/recommend/service/proxyRecommendService";
import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";

const recommendByProxy = async (req: RecommendReq): Promise<RecommendRes[]> => {
  const res = await recommend(req);
  const text = res.choices[0].message.content;
  console.log(text);
  return PromptService.parseAiResponse(text);
};

const recommendByMockData = (): RecommendRes[] => {
  const text = FOOD_RECOMMEND_MOCK_RESPONSE;
  return PromptService.parseAiResponse(text);
};

const RecommendService = {
  recommendByProxy,
  recommendByMockData
};

export default RecommendService;