import GenerateService from '@/domain/generate/service/generateService';
import { GenerateReq } from '@/domain/generate/type/generateReq';
import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.post('/generate/api', (req, res) => {
  /*  #swagger.tags = ['Generate']
      #swagger.summary = 'API를 통해 요리 추천'
      #swagger.description = 'OpenAI의 GPT API를 통한 요리 메뉴 추천 API' */
  /* #swagger.responses[501] = {
      schema: { "$ref": "#/definitions/GenerateNotImplementedRes" },
      description: "아직 구현안됨" } */
  throw new NotImplementedException();
});

router.post('/generate/proxy', async (req, res) => {
  /*  #swagger.tags = ['Generate']
      #swagger.summary = '프록시를 통해 요리 추천'
      #swagger.description = 'GPT 리버스 프록시를 통한 요리 메뉴 추천 API' */
  /* #swagger.parameters['obj'] = {
      in: 'body',
      description: '재료와 조미료, 소스 정보',
      required: true,
      schema: { $ref: "#/definitions/GenerateReq" }
  } */
  /* #swagger.responses[200] = {
      schema: { "$ref": "#/definitions/GenerateRes" },
      description: "성공" } */
  /* #swagger.responses[400] = {
      schema: { "$ref": "#/definitions/GenerateBadRequestRes" },
      description: "요청이 양식에 맞지않음" } */
  /* #swagger.responses[409] = {
      schema: { "$ref": "#/definitions/GenerateConflictRes" },
      description: "사용자의 요청을 토대로 AI가 요리 추천을 하는데 문제가 발생함" } */
  
  const payload: GenerateReq = {
    ingredients: req.body.ingredients,
    seasonings: req.body.seasonings
  };
  res.json(
    await GenerateService.generateByProxy(payload)
  );
});

router.post('/generate/local', (req, res) => {
  /*  #swagger.tags = ['Generate']
      #swagger.summary = '로컬 AI를 통해 요리 추천'
      #swagger.description = '로컬에서 직접 AI를 실행하여 요리 메뉴 추천하는 API' */
  /* #swagger.responses[501] = {
      schema: { "$ref": "#/definitions/GenerateNotImplementedRes" },
      description: "아직 구현안됨" } */
  throw new NotImplementedException();
});

const GenerateController = router;
export default GenerateController;
