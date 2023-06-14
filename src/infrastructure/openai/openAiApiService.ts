import { Configuration, CreateChatCompletionRequest, OpenAIApi } from "openai";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { Prompt } from "@/infrastructure/prompt/type/prompt";
import BadGatewayException from "@/global/error/exceptions/badGatewayException";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY
});
const openAi = new OpenAIApi(configuration);

const {
  OPENAI_MODEL_TYPE,
  OPENAI_MODEL_TEMPERATURE,
  OPENAI_MODEL_MAX_TOKENS,
  OPENAI_MODEL_presence_penalty,
  OPENAI_MODEL_frequency_penalty
} = process.env;

const generate = async (prompts: Prompt[]): Promise<string> => {
  
  const payload = getPayload(prompts);
  const res = await openAi.createChatCompletion(payload);
  console.info(res.data)
  const message = res.data.choices[0].message;
  if (!message?.content) {
    throw new BadGatewayException('OpenAI 서버에 문제가 발생하였습니다.');
  }
  console.info('Response: ', message.content);
  return message.content;
}

const getPayload = (prompts: Prompt[]): CreateChatCompletionRequest => {
  if (!OPENAI_MODEL_TYPE) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. OpenAI 모델 설정을 확인해주세요.');
  }
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

export const OpenAiApiService = {
  generate
};
