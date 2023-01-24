import { useAuthSignInWithPopup } from "@react-query-firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { DataTestIds } from "../../../common/const/data-testid";
import { auth } from "../../firebase/firebase";

interface GoogleAuthButtonProps {
  disabled?: boolean;
  text: string;
}

export const GoogleAuthButton = ({ disabled, text }: GoogleAuthButtonProps) => {
  const navigate = useNavigate();
  const mutation = useAuthSignInWithPopup(auth);

  const handleGoogleAuthClick = () => {
    mutation.mutate({
      provider: new GoogleAuthProvider(),
    });

    if (mutation.isSuccess) {
      navigate("/dashboard");
    }
  };

  return (
    <button
      data-testid={DataTestIds.GoogleAuthButton}
      disabled={disabled || mutation.isLoading}
      onClick={handleGoogleAuthClick}
    >
      {text}
    </button>
  );
};
