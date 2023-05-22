import { FOOD_RECOMMEND_MOCK_RESPONSE } from "@/.prompt.env";
import { RecommendPromptService } from "@/domain/recommend/service/recommendPromptService";
import { ProxyRecommendService } from "@/domain/recommend/service/proxyRecommendService";
import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";

const recommendByProxy = async (req: RecommendReq): Promise<RecommendRes[]> => {
  const res = await ProxyRecommendService.recommend(req);
  console.log(res)
  const text = res.choices[0].message.content;
  console.log(text);
  return RecommendPromptService.parseAiResponse(text);
};

const recommendByMockData = (): RecommendRes[] => {
  const text = FOOD_RECOMMEND_MOCK_RESPONSE;
  return RecommendPromptService.parseAiResponse(text);
};

const RecommendService = {
  recommendByProxy,
  recommendByMockData
};

export default RecommendService;