
import jwt from 'jsonwebtoken'
const auth = (req, res, next) => {

    let { token } = req.headers;
    !token && res.status(401).json({ message: "please provide a token" }); // if no token => !false (true) so goes to the right side
    if (token) {
            let decoded = jwt.verify(token, "SecretKeyCanBeAnything");
            if (decoded) {
              next();
            } else {
              res.status(401).json({ message: "invalid token" });
            }
    }
}


export default auth;