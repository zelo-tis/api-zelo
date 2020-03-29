import { Request, Response } from 'express';
import Controller from '../common/utils/class/controller';



class UserController extends Controller {
  public async login(req: Request, res: Response) {
    const { username, password } = req.body;
    const basicHeader = 'Basic ZTdmOTQyNjgtODBlZi00NDQ3LTkyYTYtZWVhNjBlMDc2NzJjOjlmZTIwNGVhLTgxOTItNDc5ZS1iZWE5LTBhOTE1N2I5ODllZg==';
   
  }
}
export default new UserController();
