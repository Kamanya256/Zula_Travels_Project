const generatorService =
    require("./generator.service");



exports.generate = async (req, res) => {


    try {


        const {
            website_id,
            template_id

        } = req.body;



        const data =
            await generatorService.generateWebsite(

                website_id,

                template_id

            );


        res.json({

            success: true,

            data

        });



    }
    catch (error) {


        res.status(500).json({

            success: false,

            error: error.message

        });


    }

};