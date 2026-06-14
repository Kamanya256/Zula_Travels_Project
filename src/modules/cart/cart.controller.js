const service = require('./cart.service');

// ===============================
exports.addToCart = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await service.addToCart({
        ...req.body,
        user_id: req.user.id
      });

    res.status(201).json(data);

  } catch (error) {
    next(error);
  }
};

// ===============================
exports.getCart = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await service.getCart(
        req.user.id
      );

    res.json(data);

  } catch (error) {
    next(error);
  }
};

// ===============================
exports.removeCartItem = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await service.removeCartItem(
        req.params.id,
        req.user.id
      );

    res.json(data);

  } catch (error) {
    next(error);
  }
};

exports.checkoutCart = async (
  req,
  res,
  next
) => {
  try {

    const data =
      await service.checkoutCart(
        req.user.id
      );

    res.json(data);

  } catch (error) {

    next(error);

  }
};