import Block from '../../utils/Block';
import template from './signup.hbs';
import { isValid } from '../../helpers/validate';
import { validation } from '../../constants/validation';
import './signup.scss';
import AuthController, { ControllerSignUpData } from '../../controllers/AuthController';

export default class SignupPage extends Block {
  constructor() {
    super({
      title: 'Регистрация',
      linkUrl: '/login',
      linkText: 'Войти',
      buttonLabel: 'Регистрация',
      fields: [
        {
          type: 'email',
          name: 'email',
          placeholder: 'Почта',
          required: 'required',
        },
        {
          type: 'text',
          name: 'login',
          placeholder: 'Логин',
          required: 'required',
        },
        {
          type: 'text',
          name: 'first_name',
          placeholder: 'Имя',
          required: 'required',
        },
        {
          type: 'text',
          name: 'second_name',
          placeholder: 'Фамилия',
          required: 'required',
        },
        {
          type: 'text',
          name: 'phone',
          placeholder: 'Телефон',
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
        // console.log(oldProps.fields.map((f: any) => `${f.name}: ${f.value}`));

        const signUpData: ControllerSignUpData = {
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          password: '',
          phone: '',
          confirm_password: '',
        };
        oldProps.fields.forEach((f: any) => {
          signUpData[f.name as keyof ControllerSignUpData] = f.value;
        });

        AuthController.signUp(signUpData as ControllerSignUpData)
          .then((res) => console.log(res));

        this.setProps({
          ...oldProps,
          fields: [...oldProps.fields],
        });
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
