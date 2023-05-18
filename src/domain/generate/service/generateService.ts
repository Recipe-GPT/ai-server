import PromptService from "@/domain/generate/service/promptService";
import { generate } from "@/domain/generate/service/proxyGenerateService";
import { GenerateReq } from "@/domain/generate/type/generateReq";
import { GenerateRes } from "@/domain/generate/type/generateRes";

const generateByProxy = async (req: GenerateReq): Promise<GenerateRes[]> => {
  const res = await generate(req);
  const text = res.choices[0].message.content;
  console.log(text)
  return PromptService.parseAiResponse(text);
};

const GenerateService = {
  generateByProxy
};

export default GenerateService;