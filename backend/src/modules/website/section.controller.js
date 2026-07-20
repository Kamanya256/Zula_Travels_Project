const service =
    require("./section.service");



// GET PAGE SECTIONS

exports.getPageSections =
    async (req, res) => {

        try {


            const data =
                await service.getPageSections(
                    req.params.pageId
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




// CREATE

exports.createSection =
    async (req, res) => {


        try {


            const data =
                await service.createSection(

                    req.params.pageId,

                    req.body

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



// UPDATE

exports.updateSection =
    async (req, res) => {


        try {


            const data =
                await service.updateSection(

                    req.params.id,

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



// STATUS

exports.updateStatus =
    async (req, res) => {


        try {


            const data =
                await service.updateStatus(

                    req.params.id,

                    req.body.status

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



// DELETE

exports.deleteSection =
    async (req, res) => {


        try {


            const data =
                await service.deleteSection(
                    req.params.id
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