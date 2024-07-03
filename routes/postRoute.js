import express from 'express';
import {get_post} from '../controllers/postController.js';
import { auth } from '../middleware/auth.js';

const router = express.Router();

// Route definition using ES6 module syntax
router.get('/mypost', auth.authenticate(), get_post);

export default router;
