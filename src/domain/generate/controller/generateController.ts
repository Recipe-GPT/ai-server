import GenerateService from '@/domain/generate/service/generateService';
import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
import asyncify from 'express-asyncify';
const router = asyncify(express.Router());

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.get('/generate/api', (req, res) => {
  throw new NotImplementedException();
});

router.get('/generate/proxy', async (req, res) => {
  await GenerateService.generateByProxy();
});

router.get('/generate/local', (req, res) => {
  throw new NotImplementedException();
});

const GenerateController = router;
export default GenerateController;