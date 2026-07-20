const service =
    require("./page.service");



exports.getPages =
    async (req, res) => {

        try {

            const data =
                await service.getPages(
                    req.params.websiteId
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




exports.createPage =
    async (req, res) => {


        try {


            const data =
                await service.createPage(

                    req.params.websiteId,

                    req.body

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