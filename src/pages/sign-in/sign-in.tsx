import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { GoogleAuthButton } from "components/google-auth-button/google-auth-button";
import { Input } from "components/input/input";
import { Button } from "components/button/button";
import { LocalisedText } from "components/localisedText";
import { TextKey } from "common/const/localisation/text-keys";
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
      <h1>
        <LocalisedText textKey={TextKey.SignIn} />
      </h1>
      <Input
        label={<LocalisedText textKey={TextKey.Email} />}
        name="email"
        onChange={setEmailHandler}
        type="email"
        value={email}
      />
      <Input
        label={<LocalisedText textKey={TextKey.Password} />}
        name="password"
        onChange={setPasswordHandler}
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
        <LocalisedText textKey={TextKey.SignIn} />
      </Button>

      <div>---OR---</div>
      <GoogleAuthButton
        disabled={mutation.isLoading}
        text={<LocalisedText textKey={TextKey.GoogleSignUp} />}
      />
      <div>-------------------</div>
      <div>
        <div>
          <LocalisedText textKey={TextKey.NoAccountYet} />
        </div>
        <Link to="/sign-up">
          <LocalisedText textKey={TextKey.SignUp} />
        </Link>
      </div>
    </div>
  );
};
