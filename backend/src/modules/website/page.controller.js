const service = require("./page.service");


// =====================================
// GET ALL WEBSITE PAGES
// =====================================

exports.getPages = async (req, res) => {

    try {

        const pages =
            await service.getPages(
                req.params.websiteId
            );


        res.json({

            success: true,

            data: pages

        });


    } catch (error) {


        res.status(500).json({

            success: false,

            error: error.message

        });


    }

};




// =====================================
// CREATE WEBSITE PAGE
// =====================================

exports.createPage = async (req, res) => {


    try {


        const pageData = {


            website_id:
                req.params.websiteId,


            title:
                req.body.title,


            slug:
                req.body.slug,


            page_type:
                req.body.page_type


        };



        const page =
            await service.createPage(
                pageData
            );



        res.json({

            success: true,

            message:
                "Page created successfully.",

            data: page

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            error: error.message

        });


    }


};