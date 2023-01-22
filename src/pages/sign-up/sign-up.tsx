import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./sign-up.module.scss";
import { GoogleAuthButton } from "../../components/google-auth-button/google-auth-button";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      console.error(error);
    },
  });

  const handleSignUp = () => {
    mutation.mutate({ email, password });

    if (mutation.isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={css.wrapper}>
      <h1>Sign up</h1>
      <form>
        <input
          style={{ border: "1px solid gray" }}
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{ border: "1px solid gray" }}
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {mutation.isError && <div>{mutation.error.message}</div>}
        <button disabled={mutation.isLoading} onClick={handleSignUp}>
          Sign up
        </button>
      </form>
      <div>---OR---</div>
      <GoogleAuthButton
        disabled={mutation.isLoading}
        text="Sign up with Google"
      />
      <div>-------------------</div>
      <div>
        <div>Already have an account?</div>
        <Link to="/sign-in">Sign in</Link>
      </div>
    </div>
  );
};
