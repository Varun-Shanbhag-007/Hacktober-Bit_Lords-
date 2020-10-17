import React from "react";
//import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

function Auth0ProviderWithHistory({ children }) {
    
  const domain = process.env.REACT_APP_AUTH0_DOMAIN;
  const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
  const redirectUri = process.env.REACT_APP_REDIRECT_URL;
/*const scope = process.env.REACT_APP_READ_USER_SCOPE;
const history = useHistory();

const onRedirectCallback = (appState) => {
  history.push(appState?.returnTo || window.location.pathname);
};
audience={`https://${domain}/api/v2/`}
scope={scope}
onRedirectCallback={onRedirectCallback}*/
  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={redirectUri}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;