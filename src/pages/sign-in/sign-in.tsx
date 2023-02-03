import { useAuthSignInWithEmailAndPassword } from "@react-query-firebase/auth";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebase";
import { GoogleAuthButton } from "components/google-auth-button/google-auth-button";
import { Input } from "components/input/input";
import { Button } from "components/button/button";
import { LocalisedText } from "components/localisedText";
import { TextKey } from "common/const/localisation/text-keys";
import css from "./sign-in.module.scss";
import { MainTitle } from "components/typography/typography";
import { EMAIL_REGEX } from "src/const/validations";

export const SignIn = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const mutation = useAuthSignInWithEmailAndPassword(auth, {
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
        <LocalisedText textKey={TextKey.SignIn} />
      </MainTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label={<LocalisedText textKey={TextKey.Email} />}
          name="email"
          register={register}
          validation={{ pattern: EMAIL_REGEX }}
        />
        {errors.email?.type === "pattern" && (
          <div>Email is in wrong format</div>
        )}
        {errors.email?.type === "required" && <div>Email is required</div>}
        <Input
          label={<LocalisedText textKey={TextKey.Password} />}
          name="password"
          type="password"
          register={register}
          validation={{ minLength: "8", required: true }}
        />
        {errors.password?.type === "minLength" && (
          <div>
            Password is too short - It should be at least 8 characters long
          </div>
        )}
        {errors.password?.type === "required" && (
          <div>Password is required</div>
        )}
        <Button disabled={mutation.isLoading} type="submit" variant="primary">
          <LocalisedText textKey={TextKey.SignIn} />
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
          <LocalisedText textKey={TextKey.NoAccountYet} />
        </div>
        <Link to="/sign-up">
          <LocalisedText textKey={TextKey.SignUp} />
        </Link>
      </div>
    </div>
  );
};
