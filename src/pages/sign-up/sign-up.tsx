import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "components/input/input";
import { Button } from "components/button/button";
import css from "./sign-up.module.scss";
import { GoogleAuthButton } from "components/google-auth-button/google-auth-button";
import { LocalisedText } from "components/localisedText";
import { TextKey } from "common/const/localisation/text-keys";

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
    setEmail(e.target.value);
  };
  const setPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  return (
    <div className={css.wrapper}>
      <h1>
        <LocalisedText textKey={TextKey.SignUp} />
      </h1>
      <form>
        <Input
          label={<LocalisedText textKey={TextKey.Email} />}
          name="email"
          onChange={setEmailHandler}
          type="email"
          value={email}
        />
        <Input
          label={<LocalisedText textKey={TextKey.Password} />}
          name="Password"
          onChange={setPasswordHandler}
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
          <LocalisedText textKey={TextKey.SignUp} />
        </Button>
      </form>
      <div>---OR---</div>
      <GoogleAuthButton
        disabled={mutation.isLoading}
        text={<LocalisedText textKey={TextKey.GoogleSignUp} />}
      />
      <div>-------------------</div>
      <div>
        <div>
          <LocalisedText textKey={TextKey.AlreadyHaveAnAccount} />
        </div>
        <Link to="/sign-in">
          <LocalisedText textKey={TextKey.SignIn} />
        </Link>
      </div>
    </div>
  );
};
