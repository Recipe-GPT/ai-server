import PromptService from "@/domain/recommend/service/promptService";
import { recommend } from "@/domain/recommend/service/proxyRecommendService";
import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { RecommendRes } from "@/domain/recommend/type/recommendRes";

const recommendByProxy = async (req: RecommendReq): Promise<RecommendRes[]> => {
  const res = await recommend(req);
  const text = res.choices[0].message.content;
  console.log(text)
  return PromptService.parseAiResponse(text);
};

const RecommendService = {
  recommendByProxy
};

export default RecommendService;