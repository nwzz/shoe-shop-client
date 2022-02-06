import createPersistedState from "use-persisted-state";
const useAuthState = createPersistedState("auth");

const useData = () => {
  const [user, setUser] = useAuthState(null);

  const signOut = () => {
    setUser(null);
  };

  return {
    user,
    setUser,
    signOut,
  };
};

export default useData;
