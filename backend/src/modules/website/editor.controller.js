const service =
    require("./editor.service");



// ======================================
// GET EDITOR DATA
// ======================================

exports.getEditor =
    async (req, res) => {


        try {


            const data =
                await service.getEditor(
                    req.params.websiteId
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