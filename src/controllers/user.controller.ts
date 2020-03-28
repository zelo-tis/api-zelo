import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';

const securityClient = require('@hotmart/hot-security-node');

class UserController extends Controller {
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const basicHeader = 'Basic ZTdmOTQyNjgtODBlZi00NDQ3LTkyYTYtZWVhNjBlMDc2NzJjOjlmZTIwNGVhLTgxOTItNDc5ZS1iZWE5LTBhOTE1N2I5ODllZg==';
    try {
      const response = await securityClient.loginUser(basicHeader, username, password);
      console.log('response', response);
      const token = await securityClient.decode(response.access_token, console);
      res.json(token);
    } catch (err) {
      console.log(err.status, err.data);
      this.sendError(res, err);
    }
  }
}
export default new UserController();
