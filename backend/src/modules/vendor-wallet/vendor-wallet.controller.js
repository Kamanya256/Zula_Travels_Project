const service =
    require("./vendor-wallet.service");



exports.getWallet =
    async (req, res) => {

        try {


            const data =
                await service.getWallet(
                    req.user.vendor_id
                );



            res.json({

                success: true,

                data

            });


        } catch (error) {


            res.status(400).json({

                success: false,

                error: error.message

            });


        }


    };