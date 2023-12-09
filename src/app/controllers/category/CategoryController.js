const CategoryCourse = require('../../models/CategoryCourse');
const { mongooseToObject } = require('../../../until/mongoose');

class CategoryController {
    // [GET] /category/api/getallcategory
    getAllCategory(req, res, next) {
        CategoryCourse.find({ })
        .then((category) =>
            res.json({
                data: category,
                message: 'is successfully'
            })
        )
        .catch(next);
    }  
    // [POST] /category/api/create
    createCategory(req, res, next) {
        let dataDefaul = {
            cate_id: 1,
            categoryName: 'Technology',
            description: 'Get all course advance has topic related about tech',
            active: true,
        }
        const category = new CategoryCourse(dataDefaul);
        category
            .save()
            .then((categoryItem) => res.json(categoryItem))
            .catch((error) => {});
    }
}

module.exports = new CategoryController();