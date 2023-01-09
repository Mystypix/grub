import { useAuthUser } from "@react-query-firebase/auth";
import { auth } from "./firebase/firebase";
import css from './app.module.scss';

function App() {
  const user = useAuthUser(["user"], auth);

  if (user.isLoading) {
    return <div className={css.loader}>Loading...</div>;
  }

  if (user.data) {
    return <div>Welcome {user.data.displayName}!</div>;
  }

  return <div>Not signed in.</div>;
}

export default App
