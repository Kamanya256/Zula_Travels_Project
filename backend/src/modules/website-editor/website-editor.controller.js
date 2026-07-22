const service = require("./website-editor.service");





exports.getEditor = async (req, res) => {

    try {


        const data =
            await service.getEditor(
                req.user.id
            );


        res.json({

            success: true,

            data

        });


    }
    catch (error) {

        res.status(400).json({

            success: false,

            error: error.message

        });


    }

};








exports.updateSettings = async (req, res) => {

    try {


        const result =
            await service.updateSettings(

                req.user.id,

                req.body

            );



        res.json({

            success: true,

            data: result

        });


    }
    catch (error) {

        res.status(400).json({

            success: false,

            error: error.message

        });

    }


};








exports.updateSection = async (req, res) => {


    try {


        const result =
            await service.updateSection(

                req.params.sectionId,

                req.body

            );



        res.json({

            success: true,

            data: result

        });


    }
    catch (error) {


        res.status(400).json({

            success: false,

            error: error.message

        });


    }


};