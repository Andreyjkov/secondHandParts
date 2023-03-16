import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../store";

function MainPage() {
  const { isAuth } = useAppSelector((state) => state.auth);
  const { name } = useAppSelector((store) => store.user);

  return (
    <div className="wrapper">
      <div className="container mt-5">
        {isAuth ? (
          <>
            <h2>Привет {name}, пока доступны возможности:</h2>
            <ul>
              <li>Регистрация / Вход</li>
              <li>
                <Link to={"/add-position"}>Создания позиции товара</Link>
              </li>
              <li>
                <Link to={"/base"}>Отображения всего списка товаров</Link>
              </li>
              <li>
                Отображения информации выбранного товара (нажмите на выбранный
                товар)
              </li>
              <li>
                Редактирование товара в профиле (нажмите на выбранный товар)
              </li>
              <li>
                <Link to={"/profile"}>Редактирование профиля</Link>
              </li>
            </ul>
            <p>
              Что бы вернутся на главную страницу просто нажмите на логотип
              "Second Hand Parts""
            </p>
          </>
        ) : (
          <>
            <h2 className="text-center">
              Добро пожаловать в Second Hand Parts
            </h2>
            <p className="text-center text-muted">
              Сервис находится на стадии разработки. Для использования
              реализованных возможностей Вам нужно войти / зарегистрироваться.
            </p>
          </>
        )}

        <ToastContainer />
      </div>
    </div>
  );
}

export default MainPage;
