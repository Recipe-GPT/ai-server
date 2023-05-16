import { generate } from "@/domain/generate/service/proxyGenerateService";

const generateByProxy = async (): Promise<string> => {
  await generate();
  return '';
};

const GenerateService = {
  generateByProxy
};

export default GenerateService;