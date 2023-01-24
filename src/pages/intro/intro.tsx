import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button/button";

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Intro page</h1>
      <Button
        name="sign-in"
        onClick={() => navigate("/sign-in")}
        type="button"
        variant="general"
      >
        Sign in
      </Button>
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
