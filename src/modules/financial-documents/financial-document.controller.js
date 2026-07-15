const service =
  require('./financial-document.service');

exports.getMyDocuments =
  async (req, res) => {

    try {

      const documents =
        await service.getUserDocuments(
          req.user.id
        );

      res.json({
        success: true,
        data: documents
      });

    } catch (err) {

      res.status(500).json({
        success: false,
        error: err.message
      });

    }

  };