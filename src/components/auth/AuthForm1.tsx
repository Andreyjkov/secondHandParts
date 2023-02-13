import { useState } from "react";
import { Link } from "react-router-dom";

interface IForm {
  title: string;
  subtitle: string;
  link: string;
  btnTitle: string;
  placeholder: string;
  handleClick: (email: string, password: string) => void;
}
// interface Props {
//   props: IForm;
// }

export function AuthForm1({
  title,
  subtitle,
  link,
  placeholder,
  btnTitle,
  handleClick,
}: IForm) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <>
      <h3 className="Auth-form-title">{title}</h3>
      <div className="form-group mt-3">
        {/* <label>Email address</label> */}
        <input
          value={email}
          type="email"
          className="form-control mt-1"
          placeholder="Адрес электронной почты"
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form-group mt-3">
        {/* <label>Password</label> */}
        <input
          value={pass}
          type="password"
          className="form-control mt-1"
          placeholder={placeholder}
          onChange={(e) => setPass(e.target.value)}
        />
      </div>
      <div className="d-grid gap-2 mt-3">
        <button
          type="submit"
          className="btn btn-primary"
          onClick={() => handleClick(email, pass)}
        >
          {btnTitle}
        </button>
        <p>
          {subtitle}
          <Link to={link}></Link>
        </p>
      </div>
    </>
  );
}
