import { RecipeService } from '@/domain/recipe/service/recipeService';
import { RecipeReq } from '@/domain/recipe/type/recipeReq';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.post('/recipe/proxy', async (req, res) => {
  /*  #swagger.tags = ['Recipe']
      #swagger.summary = '프록시를 통해 요리 레시피 생성'
      #swagger.description = 'GPT 리버스 프록시를 통한 요리 레시피 생성 API' */
  /*  #swagger.security = [{
      "apiKeyAuth": []
  }] */
  /* #swagger.requestBody = {
      description: '요리 이름, 설명, 식재료, 양념 정보',
      required: true,
      schema: { $ref: "#/definitions/RecipeReq" }
  } */
  
  const payload: RecipeReq = {
    name: req.body.name,
    description: req.body.description,
    ingredients: req.body.ingredients,
    seasonings: req.body.seasonings
  };
  res.json(
    await RecipeService.generateRecipeByProxy(payload)
  );
});

export const RecipeController = router;
