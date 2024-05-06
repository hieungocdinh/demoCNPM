const LoanPackage = require('../models/LoanPackage');
const { mutipleMongooseToObject } = require('../../util/mongoose');

class AdminController{
    // GET /admin
    index(req, res, next){
        res.render('admin', {layout: 'admin'});
    }

    // GET /admin/loan-package
    viewLoanPackage(req, res, next){
        LoanPackage.find({})
            .then(loanPackages => {
                res.render('admin/viewLoanPackage', {layout: 'admin', loanPackages: mutipleMongooseToObject(loanPackages)});
            })
            .catch(next);
    }

    // GET /admin/loan-package/add
    addLoanPackage(req, res, next){
        res.render('admin/addLoanPackage', {layout: 'admin'});
    }

    //POST /admin/loan-package/stored
    storedLoanPackage(req, res, next) {
        const { ID } = req.body;

        // Tìm kiếm gói vay bằng ID trong cơ sở dữ liệu
        LoanPackage.findOne({ ID })
            .then(loanPackage => {
                if (loanPackage) {
                    // Nếu tìm thấy, gửi phản hồi lỗi về client
                    res.json({ success: false, message: 'ID gói vay đã tồn tại, vui lòng nhập ID khác.' });
                } else {
                    // Nếu không tìm thấy, tiến hành tạo mới
                    LoanPackage.create(req.body)
                        .then(() => res.json({ success: true, message: 'Tạo gói vay thành công!' }))
                        .catch(err => res.json({ success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' }));
                }
            }) 
            .catch(next);
    }

    // DELETE /admin/loan-package/delete/:id
    deleteLLoanPackage(req, res, next) {
        LoanPackage.findById(req.params.id)
            .then((loanPackage) => {
                if (!loanPackage) {
                    res.json({ success: false, message: 'Không tìm thấy gói vay. Vui lòng thử lại' });
                } else {
                    LoanPackage.deleteOne({ _id: req.params.id })
                        .then(() =>
                            res.redirect('/admin/loan-package')
                        )
                        .catch((error) => {
                            console.error('Có lỗi xảy ra khi xóa gói vay:', error);
                            res.json({ success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' });
                        });
                }
            })
            .catch(next);
    }

    // GET /admin/loan-package/edit/:id
    editFrmLoanPackage(req, res, next){
        LoanPackage.findById(req.params.id)
            .then(loanPackage => res.render('admin/editLoanPackage', {layout: 'admin', loanPackage: loanPackage.toObject()}))
            .catch(next);
    }

    // PUT /admin/loan-package/edit/:id
    editLoanPackage(req, res, next){
        LoanPackage.findById(req.params.id)
            .then((loanPackage) => {
                if(!loanPackage) {
                    res.json({ success: false, message: 'Không tìm thấy gói vay. Vui lòng thử lại' });
                } else {
                    LoanPackage.updateOne({ _id: req.params.id }, req.body)
                        .then(() => res.json({ success: true, message: 'Cập nhật gói vay thành công!' }))
                        .catch(err => res.json({ success: false, message: 'Có lỗi xảy ra, vui lòng thử lại.' }));
                }
                    
            })
            .catch(next);
    }

}

module.exports = new AdminController();