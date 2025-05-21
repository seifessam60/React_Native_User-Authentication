import { useContext, useState } from "react";
import { login } from "../util/auth";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { Alert } from "react-native";
import { AuthContext } from "../store/auth-context";
import AuthContent from "../components/Auth/AuthContent";

function LoginScreen() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const authCtx = useContext(AuthContext);
  async function signinHandler({ email, password }) {
    setIsAuthenticating(true);
    try {
      const token = await login(email, password);
      authCtx.authenticate(token);
    } catch (error) {
      Alert.alert(
        "Authentication failed",
        "Could not log you in. Please check your credentials."
      );
      setIsAuthenticating(false);
    }
  }
  if (isAuthenticating) {
    return <LoadingOverlay message={"Logging in..."} />;
  }
  return <AuthContent isLogin onAuthenticate={signinHandler} />;
}

export default LoginScreen;
