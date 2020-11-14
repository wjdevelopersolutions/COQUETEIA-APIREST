import express from 'express';
const router = express.Router();

import {
  getAdmin,
  postAdmin,
  getAdminById,
  updateAdmin,
  deleteAdmin
} from '../controllers/admin';

router.route('/')
      .get(getAdmin)
      .post(postAdmin);

router.route('/:id')
      .get(getAdminById)
      .put(updateAdmin)
      .delete(deleteAdmin);

export default router;