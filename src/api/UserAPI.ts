import BaseAPI from './BaseAPI';

export interface UserData {
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  email: string;
  phone: string;
}

export interface PasswordData {
  oldPassword: string;
  newPassword: string;
}

export default class UserAPI extends BaseAPI {
  constructor() {
    super('/user');
  }

  read = undefined;

  create = undefined;

  update(data: UserData): Promise<unknown> {
    return this.http.put('/profile', data);
  }

  updatePassword(data: PasswordData): Promise<unknown> {
    return this.http.put('/password', data);
  }

  updateAvatar(data: any): Promise<unknown> {
    return this.http.put('/profile/avatar', data, 'multipart/form-data');
  }

  delete = undefined;
}
