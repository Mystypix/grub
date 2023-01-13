import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import css from "./signUp.module.scss";
import { GoogleAuthButton } from "../../components/googleAuthButton/googleAuthButton";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const emailMutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      console.error(error);
    },
  });

  const handleSignUp = () => {
    emailMutation.mutate({ email, password });

    if (emailMutation.isSuccess) {
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
        {emailMutation.isError && <div>{emailMutation.error.message}</div>}
        <button disabled={emailMutation.isLoading} onClick={handleSignUp}>
          Sign up
        </button>
      </form>
      <div>---OR---</div>
      <GoogleAuthButton
        disabled={emailMutation.isLoading}
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
