import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./signUp.module.scss";
import { GoogleAuthButton } from "../../components/googleAuthButton/googleAuthButton";
import { Input } from "../../components/input/input";

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

  const setEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.currentTarget.value);
  };
  const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
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
