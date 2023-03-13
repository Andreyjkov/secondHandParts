import { ToastContainer } from "react-toastify";

function MainPage() {
  return (
    <div className="container">
      <h2>Добро пожаловать в Second Hand Parts</h2>
      <h4>Сервис находится на стадии разработки.</h4>
      <span>
        Для использования реализованных возможностей Вам нужно войти /
        зарегистрироваться.
      </span>
      <p>Пока доступна возожности: </p>
      <ul>
        <li>Регистрация / Вход</li>
        <li>Отображения всего списка товаров</li>
        <li>Отображения информации выбранного товара</li>
        <li>Создания позиции товара</li>
        <li>Редактирование товара в профиле</li>
        <li>Редактирование профиля</li>
      </ul>
      <ToastContainer />
    </div>
  );
}

export default MainPage;
