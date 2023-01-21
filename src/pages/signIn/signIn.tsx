import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthButton } from "../../components/googleAuthButton/googleAuthButton";
import { auth } from "../../firebase/firebase";
import { Input } from "../../components/input/input";
import css from "./signIn.module.scss";

export const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
    onError(error) {
      console.error(error);
    },
  });

  const handleSignIn = () => {
    mutation.mutate({ email, password });

    if (mutation.isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={css.wrapper}>
      <h1>Sign in</h1>
      <Input
        label="Enter your email"
        name="Email"
        onChange={setEmail}
        placeholder="Email"
        type="email"
        value={email}
      />
      <Input
        label="Your secret password"
        name="Password"
        onChange={setPassword}
        placeholder="Password"
        type="password"
        value={password}
      />
      <button disabled={mutation.isLoading} onClick={handleSignIn}>
        Sign in
      </button>
      <div>---OR---</div>
      <GoogleAuthButton
        disabled={mutation.isLoading}
        text="Sign up with Google"
      />
      <div>-------------------</div>
      <div>
        <div>Not having an account yet?</div>
        <Link to="/sign-up">Sign up</Link>
      </div>
    </div>
  );
};
