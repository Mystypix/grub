import { Link } from "react-router-dom";
import css from "./signIn.module.scss";

export const SignIn = () => {
  return (
    <div className={css.wrapper}>
      <h1>Sign in</h1>
      <input
        style={{ border: "1px solid gray" }}
        type="email"
        placeholder="Email"
      />
      <input
        style={{ border: "1px solid gray" }}
        type="password"
        placeholder="Password"
      />
      <button>Sign in</button>
      <div>---OR---</div>
      <button>Sign in with Google</button>
      <div>-------------------</div>
      <div>
        <div>Not having an account yet?</div>
        <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
};
