import { GenerateReq } from "@/domain/generate/type/generateReq";
import { Prompt } from "@/domain/generate/type/prompt";
import { Ingredients } from "@/domain/generate/type/ingredient";
import { Condiments } from "@/domain/generate/type/condiments";

const getUserPrompt = (req: GenerateReq) => {
  const prompt: Prompt = {
    role: 'user',
    content: `${getIngredientsPrompt(req.ingredients)}\n${getCondimentsPrompt(req.condiments)}`
  };

  return prompt;
};

const getIngredientsPrompt = (ingredients: Ingredients): string => 
  `재료("${ingredients.join('" + "')}")`;

const getCondimentsPrompt = (condiments: Condiments): string => 
  `조미료, 소스("${condiments.join('" + "')}")`;

const PromptService = {
  getUserPrompt
}

export default PromptService;
