# Форма логина

- fetch замокан, валидные credentials `test@test.com` + `12345`, в ином случае возвращается ошибка.
- Задержка ответа полсекунды, чтобы было видно в UI
- Положительный ответ редиректит на welcome и только. В полноценном проекте надо сохранять токен и данные юзера, это пропущено.
- Добавлена простейшая валидация - пустые мэйл и пароль, невалидный мэйл. Валидация идет через regex, чтобы и здесь не использовать библиотеки, не только в UI.
- Ошибки мапятся обратно в форму в соответствующие поля, ошибка "авторизации" сразу в оба.