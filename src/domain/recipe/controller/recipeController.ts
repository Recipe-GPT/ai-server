import { RecipeService } from '@/domain/recipe/service/recipeService';
import { RecipeReq } from '@/domain/recipe/type/recipeReq';
import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.post('/recipe/api', (req, res) => {
  /*  #swagger.tags = ['Recipe']
      #swagger.summary = 'API를 통해 레시피 생성'
      #swagger.description = 'OpenAI의 GPT API를 통한 레시피 생성 API' */
  /*  #swagger.security = [{
      "apiKeyAuth": []
  }] */
  /* #swagger.responses[401] = {
      schema: { "$ref": "#/definitions/UnAuthorizedRes" },
      description: "인증 안됨" } */
  /* #swagger.responses[500] = {
      schema: { "$ref": "#/definitions/InternalServerErrorRes" },
      description: "내부 서버 문제" } */
  /* #swagger.responses[501] = {
      schema: { "$ref": "#/definitions/NotImplementedRes" },
      description: "아직 구현안됨" } */
  throw new NotImplementedException();
});

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
  /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/RecipeRes" },
      description: "성공" } */
  /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/RecipeBadRequestRes" },
      description: "요청이 양식에 맞지않음" } */
  /* #swagger.responses[401] = {
      schema: { "$ref": "#/definitions/UnAuthorizedRes" },
      description: "인증 안됨" } */
  /* #swagger.responses[409] = {
      schema: { "$ref": "#/definitions/RecipeConflictRes" },
      description: "사용자의 요청을 토대로 AI가 레시피를 생성하는데 문제가 발생함" } */
  /* #swagger.responses[500] = {
      schema: { "$ref": "#/definitions/InternalServerErrorRes" },
      description: "내부 서버 문제" } */
  
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

router.post('/recipe/local', (req, res) => {
  /*  #swagger.tags = ['Recipe']
      #swagger.summary = '로컬 AI를 통해 레시피 생성'
      #swagger.description = '로컬에서 직접 AI를 실행하여 레시피를 생성하는 API' */
  /*  #swagger.security = [{
      "apiKeyAuth": []
  }] */
  /* #swagger.responses[401] = {
      schema: { "$ref": "#/definitions/UnAuthorizedRes" },
      description: "인증 안됨" } */
  /* #swagger.responses[500] = {
      schema: { "$ref": "#/definitions/InternalServerErrorRes" },
      description: "내부 서버 문제" } */
  /* #swagger.responses[501] = {
      schema: { "$ref": "#/definitions/NotImplementedRes" },
      description: "아직 구현안됨" } */
  throw new NotImplementedException();
});

export const RecipeController = router;
