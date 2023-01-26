import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input/input";
import { Button } from "../../components/button/button";
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

  const setEmailHandler = (value: string) => {
    setEmail(value);
  };
  const setPasswordHandler = (value: string) => {
    setPassword(value);
  };

  return (
    <div className={css.wrapper}>
      <h1>Sign up</h1>
      <form>
        <Input
          label="Enter your email"
          name="Email"
          onChange={setEmailHandler}
          placeholder="Email"
          type="email"
          value={email}
        />
        <Input
          label="Your secrete password"
          name="Password"
          onChange={setPasswordHandler}
          placeholder="Password"
          type="password"
          value={password}
        />
        {mutation.isError && <div>{mutation.error.message}</div>}
        <Button
          disabled={mutation.isLoading}
          name="sign-in"
          onClick={handleSignUp}
          type="submit"
          variant="primary"
        >
          Sign up
        </Button>
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
