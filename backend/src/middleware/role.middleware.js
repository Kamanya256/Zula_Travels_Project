module.exports = (...allowedRoles) => {

  return (req, res, next) => {


    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });

    }


    const userRoles = req.user.roles || [];


    const hasPermission =
      allowedRoles.some(role =>
        userRoles.includes(role)
      );


    if (!hasPermission) {

      return res.status(403).json({
        success: false,
        message: "You do not have permission"
      });

    }


    next();

  };

};