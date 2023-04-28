import NotFoundException from '@/global/error/exceptions/notFoundException';
import UnAuthorizedException from '@/global/error/exceptions/unAuthorizedException';
import express from 'express';
const router = express.Router();

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.use('/hello', (req, res) => {
  throw new UnAuthorizedException();
});

export default router;