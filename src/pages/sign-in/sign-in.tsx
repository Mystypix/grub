import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthButton } from "../../components/google-auth-button/google-auth-button";
import { auth } from "../../firebase/firebase";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
import css from "./sign-in.module.scss";

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

  const setEmailHandler = (value: string) => {
    setEmail(value);
  };
  const setPasswordHandler = (value: string) => {
    setPassword(value);
  };

  return (
    <div className={css.wrapper}>
      <h1>Sign in</h1>
      <Input
        label="Enter your email"
        name="Email"
        onChange={setEmailHandler}
        placeholder="Email"
        type="email"
        value={email}
      />
      <Input
        label="Your secret password"
        name="Password"
        onChange={setPasswordHandler}
        placeholder="Password"
        type="password"
        value={password}
      />
      <Button
        disabled={mutation.isLoading}
        name="sign-in"
        onClick={handleSignIn}
        type="submit"
        variant="primary"
      >
        Sign in
      </Button>

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
