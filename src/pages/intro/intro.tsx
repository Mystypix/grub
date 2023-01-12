import { useNavigate } from "react-router-dom";

export const Intro = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Intro page</h1>
      <button onClick={() => navigate("/sign-in")}>Sign in</button>
      <button onClick={() => navigate("/sign-up")}>Sign up</button>
    </div>
  );
};
