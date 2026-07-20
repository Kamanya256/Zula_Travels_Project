const service =
    require("./vendor-website.service");




// =====================================
// GET WEBSITE
// =====================================

exports.getWebsite =
    async (req, res) => {


        try {


            const data =
                await service.getMyWebsite(

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





// =====================================
// UPDATE BRANDING
// =====================================

exports.updateBranding =
    async (req, res) => {


        try {


            const data =
                await service.updateBranding(

                    req.user.id,

                    req.body

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





// =====================================
// UPDATE SECTION
// =====================================

exports.updateSection =
    async (req, res) => {


        try {


            const data =
                await service.updateSection(

                    req.user.id,

                    req.params.id,

                    req.body

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





// =====================================
// PUBLISH
// =====================================

exports.publish =
    async (req, res) => {


        try {


            const data =
                await service.publishWebsite(

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