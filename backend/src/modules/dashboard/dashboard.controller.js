// ======================================================
// ZULA TRAVELS 2026
// DASHBOARD CONTROLLER
// ======================================================


const service = require("./dashboard.service");



// =====================================
// DASHBOARD OVERVIEW
// =====================================


exports.getDashboard = async (req, res) => {


    try {


        const stats =
            await service.getDashboardStats();



        const recentUsers =
            await service.getRecentUsers();



        return res.status(200).json({

            success: true,

            stats,

            recentUsers

        });



    } catch (error) {


        console.error(
            "DASHBOARD ERROR:",
            error
        );


        return res.status(500).json({

            success: false,

            message: error.message

        });


    }


};