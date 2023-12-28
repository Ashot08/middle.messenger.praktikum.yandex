import Block from '../../utils/Block';
import template from './login.hbs';
import { isValid } from '../../helpers/validate';
import './login.scss';
import { validation } from '../../constants/validation';
import AuthController from '../../controllers/AuthController';
import { SignInData } from '../../api/AuthAPI';

export default class LoginPage extends Block {
  constructor() {
    super({
      title: 'Вход',
      linkText: 'Нет аккаунта?',
      linkUrl: '/sign-up',
      buttonLabel: 'Войти',
      fields: [
        {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          required: 'required',
        },
        {
          type: 'password',
          name: 'password',
          placeholder: 'Пароль',
          required: 'required',
        },
      ],
      response: '',
      onSubmit: (e: any) => {
        e.preventDefault();
        const formData: any = new FormData(e.target);
        let oldProps:any = {};
        for (const pair of formData.entries()) {
          const isInputValid = isValid(pair[0], pair[1]);
          oldProps = { ...this.props };
          for (const field of oldProps.fields) {
            if (!isInputValid && field.name === pair[0]) {
              field.error = validation[pair[0]].message;
              field.value = pair[1];
            }
            if (isInputValid && field.name === pair[0]) {
              field.error = '';
              field.value = pair[1];
            }
          }
        }

        const loginData: SignInData = {
          login: '',
          password: '',
        };
        oldProps.fields.forEach((f: any) => {
          loginData[f.name as keyof SignInData] = f.value;
        });

        AuthController.signIn(loginData as SignInData)
          .then((res) => console.log(res));

        // this.setProps({
        //   ...oldProps,
        //   fields: [...oldProps.fields],
        // });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
