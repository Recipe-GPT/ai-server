import { ERROR_CHECK_SIGN, POLICY_PROMPT } from '@/.prompt.env';
import InternalServerException from '@/global/error/exceptions/internalServerException';
import { Prompt } from '@/infrastructure/prompt/type/prompt';
import { PromptService } from '@/infrastructure/prompt/promptService';
import ConflictException from '@/global/error/exceptions/conflictException';
import { OpenAiProxyService } from '@/infrastructure/openai/openAiProxyService';

const contentPolicyCheck = async (...inputs: string[]) => {
  if (!POLICY_PROMPT) {
    throw new InternalServerException('서버에 문제가 발생하였습니다. 프롬프트 설정을 확인해주세요.');
  }
  
  const prompt: Prompt = {
    role: 'user',
    content: inputs.join('\n')
  }
  const prompts: Prompt[] = POLICY_PROMPT.concat(prompt);

  const text = await OpenAiProxyService.generate(prompts);
  if (PromptService.isError(text)) {
    const errorMessage = text.split(ERROR_CHECK_SIGN)[1].trim();
    throw new ConflictException(errorMessage);
  }
}

export const PolicyService = {
  contentPolicyCheck
};
