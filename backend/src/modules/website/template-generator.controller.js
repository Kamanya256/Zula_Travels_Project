const service = require("./template-generator.service");

exports.generateWebsite = async (req, res) => {

    try {

        const data = await service.generateWebsite(
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