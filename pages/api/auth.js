import { decodeToken } from "../../tools/helper";

export default function handler(req, res) {
  if (req.method === 'GET') {
    if (!('token' in req.cookies)) {
      res.status(401).json({message: 'havent logged in'});
      return;
    }
    let decodedToken= "";
    const token = req.cookies.token;
    if (token) {
      try {
        decodedToken = decodeToken(token);
      } catch (e) {
        console.error(e);
        res.status(401).json({message: 'decoded error'});
        return
      }
    }
    if (decodedToken) {
      res.status(200).json(decodedToken);
      return;
    } else {
      res.status(401).json({message: 'Unable to auth'});
    }
  }
}
