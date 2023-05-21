import { Ingredients } from "@/domain/food/type/ingredient";
import { Seasonings } from "@/domain/food/type/seasoning";
import { ERROR_CHECK_SIGN, INGREDIENTS, ITEM_DELIMITER, ITEM_DELIMITER_PREFIX, ITEM_DELIMITER_SUFFIX, SEASONINGS } from "@/.prompt.env";

const getIngredientsPrompt = (ingredients: Ingredients): string => 
  `${INGREDIENTS}(${ITEM_DELIMITER_PREFIX}${ingredients.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const getSeasoningsPrompt = (seasonings: Seasonings): string => 
  `${SEASONINGS}(${ITEM_DELIMITER_PREFIX}${seasonings.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const isError = (text: string): boolean => {
  return text.includes(ERROR_CHECK_SIGN);
}

const PromptService = {
  getIngredientsPrompt,
  getSeasoningsPrompt,
  isError
}

export default PromptService;
