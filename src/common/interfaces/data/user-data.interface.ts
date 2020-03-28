import { UserInterface, UserProjectInterface, UserLanguageInterface } from '../database';

export interface UserDataInterface {
    table: UserInterface;
    projects: UserProjectInterface[];
    languages: UserLanguageInterface[];
}
