import GenerateController from '@/domain/generate/controller/generateController';
import { authClient } from '@/global/auth/auth';
import express from 'express';
const router = express.Router();

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.use(authClient, GenerateController);

export default router;