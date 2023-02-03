import { useAuthCreateUserWithEmailAndPassword } from "@react-query-firebase/auth";
import { auth } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "components/input/input";
import { Button } from "components/button/button";
import css from "./sign-up.module.scss";
import { GoogleAuthButton } from "components/google-auth-button/google-auth-button";
import { LocalisedText } from "components/localisedText";
import { TextKey } from "common/const/localisation/text-keys";
import { MainTitle } from "components/typography/typography";

export const SignUp = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useAuthCreateUserWithEmailAndPassword(auth, {
    onError(error) {
      console.error(error);
    },
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    mutation.mutate({ email, password });

    if (mutation.isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <div className={css.wrapper}>
      <MainTitle>
        <LocalisedText textKey={TextKey.SignUp} />
      </MainTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={<LocalisedText textKey={TextKey.Email} />}
          name="email"
          register={register}
        />
        <Input
          label={<LocalisedText textKey={TextKey.Password} />}
          name="Password"
          register={register}
          type="password"
        />
        {mutation.isError && <div>{mutation.error.message}</div>}
        <Button disabled={mutation.isLoading} type="submit" variant="primary">
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
