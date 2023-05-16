import GenerateController from '@/domain/generate/generateController';
import express from 'express';
const router = express.Router();

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.use(GenerateController);

export default router;