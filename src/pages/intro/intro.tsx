import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Intro page</h1>
      <Button
        name="sign-in"
        type="button"
        priority="primary"
        onClick={() => navigate("/sign-in")}
      >
        Sign in
      </Button>
      <Button
        name="sign-up"
        type="button"
        priority="secondary"
        onClick={() => navigate("/sign-up")}
      >
        Sign up
      </Button>
    </div>
  );
};
