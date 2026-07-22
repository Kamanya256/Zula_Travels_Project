const service = require("./vendor-dashboard.service");


exports.dashboard = async (req, res) => {

    try {

        const userId = req.user.id;


        const data = await service.getDashboard(userId);


        res.json({
            success: true,
            data
        });


    } catch (error) {

        res.status(400).json({

            success: false,
            message: error.message

        });

    }

};