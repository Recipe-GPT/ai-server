import { RecommendReq } from "@/domain/recommend/type/recommendReq";
import { Prompt } from "@/domain/food/type/prompt";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { FOOD_RECOMMEND_PROMPT } from '@/.prompt.env';
import { RecommendPromptService } from "@/domain/recommend/service/recommendPromptService";
import { OpenAiModelRawRes } from "@/domain/food/type/openAiModelRawRes";
import axios from "axios";

const {
  OPENAI_REVERSE_PROXY,
  OPENAI_REVERSE_PROXY_PATH,
  OPENAI_REVERSE_PROXY_PASSWORD
} = process.env;
const {
  OPENAI_MODEL_TYPE,
  OPENAI_MODEL_TEMPERATURE,
  OPENAI_MODEL_MAX_TOKENS,
  OPENAI_MODEL_presence_penalty,
  OPENAI_MODEL_frequency_penalty
} = process.env;

const recommend = async (req: RecommendReq): Promise<OpenAiModelRawRes> => {
  if (!OPENAI_REVERSE_PROXY || !OPENAI_REVERSE_PROXY_PATH) {
    console.log(OPENAI_REVERSE_PROXY, OPENAI_REVERSE_PROXY_PATH)
    throw new InternalServerException('서버에 문제가 발생하였습니다. 리버스 프록시 설정을 확인해주세요.');
  }
  
  const payload = getPayload(req);
  const config = {
    headers: getHeaderPayload()
  };
  
  const res = await axios.post<OpenAiModelRawRes>(
    OPENAI_REVERSE_PROXY + OPENAI_REVERSE_PROXY_PATH,
    payload,
    config
  );
  return res.data;
};
  
const getPayload = (req: RecommendReq) => {
  if (!FOOD_RECOMMEND_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  
  const prompt: Prompt = RecommendPromptService.getUserPrompt(req);
  const prompts: Prompt[] = FOOD_RECOMMEND_PROMPT.concat(prompt);
  
  return {
    model: OPENAI_MODEL_TYPE,
    messages: prompts,
    temperature: Number(OPENAI_MODEL_TEMPERATURE),
    max_tokens: Number(OPENAI_MODEL_MAX_TOKENS),
    presence_penalty: Number(OPENAI_MODEL_presence_penalty),
    frequency_penalty: Number(OPENAI_MODEL_frequency_penalty),
    logit_bias: {}
  }
};

const getHeaderPayload = () => {
  const headers: {
    [key: string]: any
  } = {};
  
  if (OPENAI_REVERSE_PROXY_PASSWORD) {
    headers.Authorization = OPENAI_REVERSE_PROXY_PASSWORD;
  }

  return headers;
}

export const ProxyRecommendService = {
  recommend
};