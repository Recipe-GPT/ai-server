import GenerateService from '@/domain/generate/service/generateService';
import { GenerateReq } from '@/domain/generate/type/generateReq';
import { GenerateRes } from '@/domain/generate/type/generateRes';
import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.post('/generate/api', (req, res) => {
  throw new NotImplementedException();
});

router.post('/generate/proxy', async (req, res) => {
  const payload: GenerateReq = {
    ingredients: JSON.parse(req.body.ingredients),
    condiments: JSON.parse(req.body.condiments)
  };
  res.json(
    await GenerateService.generateByProxy(payload)
  );
});

router.post('/generate/local', (req, res) => {
  throw new NotImplementedException();
});

const GenerateController = router;
export default GenerateController;