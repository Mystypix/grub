import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleAuthButton } from "../../components/googleAuthButton/googleAuthButton";
import { auth } from "../../firebase/firebase";
import { Button } from "../../components/button/button";
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
      <Button
        name="sign-in"
        type="submit"
        variant="primary"
        onClick={handleSignIn}
        disabled={mutation.isLoading}
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
