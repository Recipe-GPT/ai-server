import { Ingredients } from "@/domain/food/type/ingredient";
import { Seasonings } from "@/domain/food/type/seasoning";
import { CONTENT_DELIMITER, DESCRIPTION, ERROR_CHECK_SIGN, INGREDIENTS, ITEM_DELIMITER, ITEM_DELIMITER_PREFIX, ITEM_DELIMITER_SUFFIX, NAME, SEASONINGS } from "@/.prompt.env";

const encodeName = (name: string): string => 
  NAME + CONTENT_DELIMITER + ITEM_DELIMITER_PREFIX + name + ITEM_DELIMITER_SUFFIX;

const encodeDescription = (description: string): string => 
  DESCRIPTION + CONTENT_DELIMITER + ITEM_DELIMITER_PREFIX + description + ITEM_DELIMITER_SUFFIX;

const encodeIngredients = (ingredients: Ingredients): string => 
  INGREDIENTS + CONTENT_DELIMITER + ITEM_DELIMITER_PREFIX + ingredients.join(ITEM_DELIMITER) + ITEM_DELIMITER_SUFFIX;

const encodeSeasonings = (seasonings: Seasonings): string => 
  SEASONINGS + CONTENT_DELIMITER + ITEM_DELIMITER_PREFIX + seasonings.join(ITEM_DELIMITER) + ITEM_DELIMITER_SUFFIX;

const parseItems = (text: string): string[] =>
  text.slice(ITEM_DELIMITER_PREFIX.length, (text.length - ITEM_DELIMITER_SUFFIX.length))
  .split(ITEM_DELIMITER)
  .filter(s => s)
  .map(s => s.trim());

const isError = (text: string): boolean =>
  text.includes(ERROR_CHECK_SIGN);

const parseErrorMessage = (text: string) =>
  text.split(ERROR_CHECK_SIGN)[1].trim();

export const PromptService = {
  encodeName,
  encodeDescription,
  encodeIngredients,
  encodeSeasonings,
  parseItems,
  isError,
  parseErrorMessage
};
