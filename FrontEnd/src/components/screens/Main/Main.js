import React, { Fragment } from "react";
import FCAppBar from "../../FCAppBar/FCAppBar";
import { useAuth0 } from "@auth0/auth0-react";

function Main(props){
    const {isAuthenticated, user} = useAuth0();

    return <Fragment>
        <FCAppBar {...props}/>
        <div>{isAuthenticated? user.email: null}</div>
    </Fragment>
}

export default Main;