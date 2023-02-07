import { useAppSelector } from "../store";

export function MainPage() {
  const { email } = useAppSelector((state) => state.user);

  return (
    <>
      <h1>Main Page</h1>
      <h2>Общая информация страница доступна для всех</h2>
      <p> Ваш email {email}</p>
    </>
  );
}
