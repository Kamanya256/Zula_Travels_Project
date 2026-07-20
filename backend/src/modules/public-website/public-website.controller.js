const service =
    require("./public-website.service");


// =====================================
// VIEW SINGLE PAGE
// =====================================

exports.viewPage =
    async (req, res) => {


        try {


            const data =
                await service.getPublicPage(

                    req.params.subdomain,

                    req.params.slug

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

// =====================================
// VIEW WEBSITE
// =====================================

exports.viewWebsite =
    async (req, res) => {


        try {


            const data =
                await service.getWebsiteBySubdomain(

                    req.params.subdomain

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