import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

interface IForm {
  title: string;
  subtitle: string;
  link: string;
  linkTitle: string;
  handleClick: (email: string, password: string) => void;
}

function AuthForm({ title, subtitle, link, linkTitle, handleClick }: IForm) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div className={styles['form-container']}>
      <div className={styles.form}>
        <div className={styles['form-content']}>
          <h3 className={styles['form-title']}>{title}</h3>
          <div className={styles['form-group']}>
            <label>Email address</label>
            <input
              value={email}
              type="email"
              className="form-control mt-1"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles['form-group']}>
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
              {subtitle}
              <Link to={link} className="">
                {linkTitle}
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthForm;
