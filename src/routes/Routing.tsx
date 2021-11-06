import React, { FC } from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { useRoleManager } from "../utils/roleUtils";
import { routes } from "./routes";

const Routing: FC = () => {
    const hasAnyRole = useRoleManager();

    return (
        <Switch>
            {
                routes.map(route => {
                    const Component = route.Component;
                    return (
                        <Route exact={ route.exact } path={ route.path } key={ route.path }>
                            { hasAnyRole(route.roles) ? <Component/> : <Redirect to={ "/" }/> }
                        </Route>
                    );
                })
            }
            <Redirect to={ "/" }/>
        </Switch>
    );
};

export default Routing;