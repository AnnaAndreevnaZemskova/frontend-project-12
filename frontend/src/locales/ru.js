export default {
    translation: {
      languages: {
        ru: "Русский",
      },
      navbar: {
        homeLink: "Chat (Slack)",
        logOutButton: "Выйти",
      },
      loginAndSignUp: {
        heading: "Войти",
        headingSignUp: "Регистрация",
        username: "Ваш ник",
        usernameSignUp: "Имя пользователя",
        password: "Пароль",
        confirmPassword: "Подтвердите пароль",
        loginBtn: "Войти",
        signupBtn: "Зарегистрироваться",
        linkSignUp: "Регистрация",
        footerSpan: "Нет аккаунта?",
        errors: {
          validation: {
            required: "Обязательное поле",
            wrongData: "Неверные имя пользователя или пароль",
            confirmPassword: "Пароли должны совпадать",
            nameSymbols: "От 3 до 20 символов",
            pasMinSymbols: "Не менее 6 символов",
            status409: "Такой пользователь уже существует",
          },
        },
      },
      homePage: {
        heading: "Каналы",
        channelСontrolBtn: "Управление каналом",
        prefix: "#",
        remove: "Удалить",
        rename: "Переименовать",
        addChannel: "+",
        messageCount: {
          keyWithCount_one: "{{count}} сообщение",
          keyWithCount_few: "{{count}} сообщения",
          keyWithCount_many: "{{count}} сообщений",
          keyWithCount_other: "{{count}} сообщений",
        },
        sendMessageBtn: "Отправить",
        inputMessage: "Введите сообщение...",
        inputLabel: "Новое сообщение",
      },
      notFoundPage: {
        heading: "Страница не найдена",
        body: "Но вы можете перейти ",
        homeLink: "на главную страницу",
      },
      modal: {
        submitBtn: "Отправить",
        cancelBtn: "Отменить",
        name: "Имя канала",
        add: {
          heading: "Добавить канал",
        },
        remove: {
          heading: "Удалить канал",
          body: "Уверены?",
          submitBtn: "Удалить",
        },
        rename: {
          heading: "Переименовать канал",
        },
        errors: {
          validation: {
            required: "Обязательное поле",
            minMax: "От 3 до 20 символов",
            unique: "Должно быть уникальным",
          },
        },
      },
    },
  };