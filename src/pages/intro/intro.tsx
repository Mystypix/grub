import { useNavigate } from "react-router-dom";
import { MainTitle } from "components/typography/typography";
import { Button } from "components/button/button";
import css from "./intro.module.scss";

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <div className={css.wrapper}>
      <MainTitle className={css.title}>
        Plan, Cook, and Enjoy
        <br />
        Simplify your mealtime with our app
      </MainTitle>
      <Button
        name="sign-in"
        onClick={() => navigate("/sign-in")}
        type="button"
        variant="general"
      >
        Sign in
      </Button>
      <div className={css.or}>or</div>
      <Button
        name="sign-up"
        onClick={() => navigate("/sign-up")}
        type="button"
        variant="general"
      >
        Sign up
      </Button>
    </div>
  );
};
