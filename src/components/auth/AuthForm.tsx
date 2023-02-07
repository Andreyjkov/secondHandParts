import { useState } from "react";
import { Link } from "react-router-dom";

interface IForm {
  title: string;
  subtitle: string;
  link: string;
  linkTitle: string;
  handleClick: (email: string, password: string) => void;
}

export function AuthForm({
  title,
  subtitle,
  link,
  linkTitle,
  handleClick,
}: IForm) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className="Auth-form-container px-3">
      <div className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">{title}</h3>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              value={email}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              value={pass}
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
              onChange={(e) => setPass(e.target.value)}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button
              type="submit"
              className="btn btn-primary"
              onClick={() => handleClick(email, pass)}
            >
              Submit
            </button>
            <p>
              {subtitle}{" "}
              <Link to={link} className="">
                {" "}
                {linkTitle}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
