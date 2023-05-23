import dotenv from 'dotenv';
dotenv.config({path: '.env'});
import { ERROR_CHECK_SIGN, POLICY_PROMPT } from '@/.prompt.env';
import InternalServerException from '@/global/error/exceptions/internalServerException';
import { Prompt } from '@/domain/food/type/prompt';
import { PromptService } from '@/domain/food/service/promptService';
import { OpenAiModelRawRes } from '@/domain/food/type/openAiModelRawRes';
import axios from 'axios';
import ConflictException from '@/global/error/exceptions/conflictException';

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

const contentPolicyCheck = async (...inputs: string[]) => {
  if (!OPENAI_REVERSE_PROXY || !OPENAI_REVERSE_PROXY_PATH) {
    console.log(OPENAI_REVERSE_PROXY, OPENAI_REVERSE_PROXY_PATH)
    throw new InternalServerException('서버에 문제가 발생하였습니다. 리버스 프록시 설정을 확인해주세요.');
  }

  const payload = getPayload(inputs);
  const config = {
    headers: getHeaderPayload()
  };
  
  const res = await axios.post<OpenAiModelRawRes>(
    OPENAI_REVERSE_PROXY + OPENAI_REVERSE_PROXY_PATH,
    payload,
    config
  );
  console.log(res.data)
  const text = res.data.choices[0].message.content;
  if (PromptService.isError(text)) {
    const errorMessage = text.split(ERROR_CHECK_SIGN)[1].trim();
    throw new ConflictException(errorMessage);
  }
}

const getPayload = (inputs: string[]) => {
  if (!POLICY_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  
  const prompt: Prompt = {
    role: 'user',
    content: inputs.join('\n')
  }
  const prompts: Prompt[] = POLICY_PROMPT.concat(prompt);
  
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

export const PolicyService = {
  contentPolicyCheck
};
