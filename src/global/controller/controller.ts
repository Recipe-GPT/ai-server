import RecommendController from '@/domain/recommend/controller/recommendController';
import { authClient } from '@/global/auth/auth';
import express from 'express';
const router = express.Router();

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.use(authClient, RecommendController);

export default router;