import React from "react";
import { UserProvider } from "./providers/UserProvider.jsx";
import Routes from "./routes/Routes.jsx";
import GlobalStyle from "./styles/GlobalStyle.jsx";

function App () 
{
    return (
        <>
            <UserProvider>
                < Routes/>
                <GlobalStyle/>
            </UserProvider>
        </>
    );
}

export default App;
