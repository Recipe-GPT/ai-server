import { Ingredients } from "@/domain/food/type/ingredient";
import { Seasonings } from "@/domain/food/type/seasoning";
import { DESCRIPTION, ERROR_CHECK_SIGN, INGREDIENTS, ITEM_DELIMITER, ITEM_DELIMITER_PREFIX, ITEM_DELIMITER_SUFFIX, NAME, SEASONINGS } from "@/.prompt.env";

const getNamePrompt = (name: string): string => 
  `${NAME}(${ITEM_DELIMITER_PREFIX}${name}${ITEM_DELIMITER_SUFFIX})`;

const getDescriptionPrompt = (description: string): string => 
  `${DESCRIPTION}(${ITEM_DELIMITER_PREFIX}${description}${ITEM_DELIMITER_SUFFIX})`;

const getIngredientsPrompt = (ingredients: Ingredients): string => 
  `${INGREDIENTS}(${ITEM_DELIMITER_PREFIX}${ingredients.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const getSeasoningsPrompt = (seasonings: Seasonings): string => 
  `${SEASONINGS}(${ITEM_DELIMITER_PREFIX}${seasonings.join(ITEM_DELIMITER)}${ITEM_DELIMITER_SUFFIX})`;

const isError = (text: string): boolean => {
  return text.includes(ERROR_CHECK_SIGN);
}

export const PromptService = {
  getNamePrompt,
  getDescriptionPrompt,
  getIngredientsPrompt,
  getSeasoningsPrompt,
  isError
};
