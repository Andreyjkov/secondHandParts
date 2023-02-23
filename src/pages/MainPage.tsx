import { ToastContainer } from "react-toastify";
import { useAppSelector } from "../store";

function MainPage() {
  const { email } = useAppSelector((state) => state.user);

  return (
    <div className="container">
      <h1>Main Page</h1>
      <h2>Общая информация страница доступна для всех</h2>
      <p> Ваш email {email}</p>
      <p>TODO: Валидацию на форму входа и регистрации</p>
      <p>
        TODO: Обработка ответа от регистрации (ошибки, успешность) как вариант
        "npm i react-toastify"
      </p>
      <ToastContainer />
    </div>
  );
}

export default MainPage;
