import NotImplementedException from '@/global/error/exceptions/notImplementedException';
import express from 'express';
const router = express.Router();

router.use(express.json({limit:'1mb'}));
router.use(express.urlencoded({extended:true,limit:'1mb'}));

router.use('/generate/api', (req, res) => {
  throw new NotImplementedException();
});

router.use('/generate/proxy', (req, res) => {
  throw new NotImplementedException();
});

router.use('/generate/local', (req, res) => {
  throw new NotImplementedException();
});

const GenerateController = router;
export default GenerateController;