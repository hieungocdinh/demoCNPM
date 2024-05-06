const express = require('express');
const router = express.Router();

const adminController = require('../app/controllers/AdminController');

router.put('/loan-package/edit/:id', adminController.editLoanPackage);
router.get('/loan-package/edit/:id', adminController.editFrmLoanPackage);
router.delete('/loan-package/delete/:id', adminController.deleteLLoanPackage);
router.post('/loan-package/stored', adminController.storedLoanPackage);
router.get('/loan-package/add', adminController.addLoanPackage);
router.get('/loan-package', adminController.viewLoanPackage);
router.get('/', adminController.index);

module.exports = router;