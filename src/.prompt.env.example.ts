const RECOMMEND_PROMPT = [
{
"role": "system",
"content": ""
},
{
"role": "assistant",
"content": ""
},
{
"role": "user",
"content": ""
}
];

const RECOMMEND_MOCK_RESPONSE = '';

const RECIPE_PROMPT = [
{
"role": "system",
"content": ""
},
{
"role": "assistant",
"content": ""
},
{
"role": "user",
"content": ""
}
];

const RECIPE_MOCK_RESPONSE = '';

const ERROR_CHECK_SIGN = '[Error]';

const RECOMMEND_REGEX = /\//;
const RECIPE_REGEX = /\//;

const ITEM_DELIMITER = '","';
const ITEM_DELIMITER_PREFIX = '"';
const ITEM_DELIMITER_SUFFIX = '"';
const CONTENT_DELIMITER = ': ';
const NAME = 'name';
const DESCRIPTION = 'description';
const INGREDIENTS = 'ingredients';
const SEASONINGS = 'seasonings';

export {
  RECOMMEND_PROMPT,
  RECOMMEND_MOCK_RESPONSE,
  RECIPE_PROMPT,
  RECIPE_MOCK_RESPONSE,
  ERROR_CHECK_SIGN,
  RECOMMEND_REGEX,
  RECIPE_REGEX,
  ITEM_DELIMITER,
  ITEM_DELIMITER_PREFIX,
  ITEM_DELIMITER_SUFFIX,
  CONTENT_DELIMITER,
  NAME,
  DESCRIPTION,
  INGREDIENTS,
  SEASONINGS
}
