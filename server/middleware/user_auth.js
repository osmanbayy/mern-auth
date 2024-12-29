import jwt from "jsonwebtoken";

const userAuth = async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized. Login Again.",
    });
  }

  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    if (token_decode.id) {
      req.body.userId = token_decode.id;
    } else {
      return res.json({
        success: false,
        // user: token_decode,
        message: "Not Authorized. Login Again.",
      });
    }
    next();
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export default userAuth;
