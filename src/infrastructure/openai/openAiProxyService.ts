import BadGatewayException from "@/global/error/exceptions/badGatewayException";
import InternalServerException from "@/global/error/exceptions/internalServerException";
import { OpenAiModelRawRes } from "@/infrastructure/openai/type/openAiModelRawRes";
import { Prompt } from "@/infrastructure/prompt/type/prompt";
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

const generate = async (prompts: Prompt[]): Promise<string> => {
  if (!OPENAI_REVERSE_PROXY || !OPENAI_REVERSE_PROXY_PATH) {
    console.log(OPENAI_REVERSE_PROXY, OPENAI_REVERSE_PROXY_PATH)
    throw new InternalServerException('서버에 문제가 발생하였습니다. 리버스 프록시 설정을 확인해주세요.');
  }
  
  const payload = getPayload(prompts);
  const config = {
    headers: getHeaderPayload()
  };
  
  let message: Prompt | undefined;
  try {
    const res = await axios.post<OpenAiModelRawRes>(
      OPENAI_REVERSE_PROXY + OPENAI_REVERSE_PROXY_PATH,
      payload,
      config
    );
    message = res.data.choices[0].message;
  } catch (error) {
    throw new BadGatewayException('OpenAI 프록시 서버에 문제가 발생하였습니다.');
  }
  if (!message) {
    throw new BadGatewayException('OpenAI 프록시 서버에 문제가 발생하였습니다.');
  }
  return message.content;
}

const getPayload = (prompts: Prompt[]) => ({
  model: OPENAI_MODEL_TYPE,
  messages: prompts,
  temperature: Number(OPENAI_MODEL_TEMPERATURE),
  max_tokens: Number(OPENAI_MODEL_MAX_TOKENS),
  presence_penalty: Number(OPENAI_MODEL_presence_penalty),
  frequency_penalty: Number(OPENAI_MODEL_frequency_penalty),
  logit_bias: {}
});

const getHeaderPayload = () => {
  const headers: {
    [key: string]: any
  } = {};
  
  if (OPENAI_REVERSE_PROXY_PASSWORD) {
    headers.Authorization = OPENAI_REVERSE_PROXY_PASSWORD;
  }

  return headers;
}

export const OpenAiProxyService = {
  generate
};
