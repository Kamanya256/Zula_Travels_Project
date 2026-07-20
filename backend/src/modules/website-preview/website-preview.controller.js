const service =
    require("./website-preview.service");



exports.preview =
    async (req, res) => {


        try {


            const data =
                await service.previewWebsite(

                    req.params.id

                );



            res.json({

                success: true,

                data

            });


        }
        catch (error) {


            res.status(404).json({

                success: false,

                error: error.message

            });


        }


    };