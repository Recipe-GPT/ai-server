import RecommendService from '@/domain/recommend/service/recommendService';
import { RecommendReq } from '@/domain/recommend/type/recommendReq';
import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.post('/recommend/mock', (req, res) => {
  /*  #swagger.tags = ['Recommend']
      #swagger.summary = '요리 추천 목업 데이터 API'
      #swagger.description = '실제 AI가 생성하지 않고 미리 만들어둔 데이터만 반환합니다. 응답 속도가 빠르고 AI 사용료가 나오지 않으니 왠만하면 이 API로 개발해주세요.' */
  /*  #swagger.security = [{
      "apiKeyAuth": []
  }] */
  /* #swagger.requestBody = {
      description: '재료와 조미료, 소스 정보',
      required: true,
      schema: { $ref: "#/definitions/RecommendReq" }
  } */
  /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/RecommendRes" },
      description: "성공" } */
  /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/RecommendBadRequestRes" },
      description: "요청이 양식에 맞지않음" } */
  /* #swagger.responses[401] = {
      schema: { "$ref": "#/definitions/UnAuthorizedRes" },
      description: "인증 안됨" } */
  /* #swagger.responses[500] = {
      schema: { "$ref": "#/definitions/InternalServerErrorRes" },
      description: "내부 서버 문제" } */
  
  res.json(
    RecommendService.recommendByMockData()
  );
});

router.post('/recommend/api', (req, res) => {
  /*  #swagger.tags = ['Recommend']
      #swagger.summary = 'API를 통해 요리 추천'
      #swagger.description = 'OpenAI의 GPT API를 통한 요리 메뉴 추천 API' */
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

router.post('/recommend/proxy', async (req, res) => {
  /*  #swagger.tags = ['Recommend']
      #swagger.summary = '프록시를 통해 요리 추천'
      #swagger.description = 'GPT 리버스 프록시를 통한 요리 메뉴 추천 API' */
  /*  #swagger.security = [{
      "apiKeyAuth": []
  }] */
  /* #swagger.requestBody = {
      description: '재료와 조미료, 소스 정보',
      required: true,
      schema: { $ref: "#/definitions/RecommendReq" }
  } */
  /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/RecommendRes" },
      description: "성공" } */
  /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/RecommendBadRequestRes" },
      description: "요청이 양식에 맞지않음" } */
  /* #swagger.responses[401] = {
      schema: { "$ref": "#/definitions/UnAuthorizedRes" },
      description: "인증 안됨" } */
  /* #swagger.responses[409] = {
      schema: { "$ref": "#/definitions/RecommendConflictRes" },
      description: "사용자의 요청을 토대로 AI가 요리 추천을 하는데 문제가 발생함" } */
  /* #swagger.responses[500] = {
      schema: { "$ref": "#/definitions/InternalServerErrorRes" },
      description: "내부 서버 문제" } */
  
  const payload: RecommendReq = {
    ingredients: req.body.ingredients,
    seasonings: req.body.seasonings
  };
  res.json(
    await RecommendService.recommendByProxy(payload)
  );
});

router.post('/recommend/local', (req, res) => {
  /*  #swagger.tags = ['Recommend']
      #swagger.summary = '로컬 AI를 통해 요리 추천'
      #swagger.description = '로컬에서 직접 AI를 실행하여 요리 메뉴 추천하는 API' */
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

export const RecommendController = router;
