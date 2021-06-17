import { useContext } from "react";
import { UserContext } from "../providers/UserProvider";

export function useUser ()
{
    const context = useContext(UserContext);

    return context;
}
