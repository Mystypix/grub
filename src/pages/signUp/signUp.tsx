import { Link } from "react-router-dom";
import css from "./signUp.module.scss";

export const SignUp = () => {
  return (
    <div className={css.wrapper}>
      <h1>Sign up</h1>
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
      <button>Sign up</button>
      <div>---OR---</div>
      <button>Sign up with Google</button>
      <div>-------------------</div>
      <div>
        <div>Already have an account?</div>
        <Link to="/sign-in">Sign in</Link>
      </div>
    </div>
  );
};
