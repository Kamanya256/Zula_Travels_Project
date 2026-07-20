const templateService =
    require("./template.service");



// GET TEMPLATES

exports.getTemplates = async (req, res) => {

    try {

        const data =
            await templateService.getTemplates();


        res.json({

            success: true,

            data

        });


    } catch (error) {

        res.status(500).json({

            success: false,

            error: error.message

        });

    }

};




// APPLY TEMPLATE

exports.applyTemplate = async (req, res) => {


    try {


        const {
            website_id,
            template_id
        } = req.body;



        const data =
            await templateService.applyTemplate(

                website_id,

                template_id

            );


        res.json({

            success: true,

            data

        });



    } catch (error) {


        res.status(500).json({

            success: false,

            error: error.message

        });


    }


};