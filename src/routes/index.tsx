import { ReactNode } from "react";
import appRoutes from "./appRoutes";
import { RouteType } from "./config";
import { Route } from "react-router-dom";

const generateRoute = (routes: RouteType[]): ReactNode => {
  return routes.map((route, index) =>
    route.index ? (
      <Route index path={route.path} element={route.element} key={index} />
    ) : (
      <Route path={route.path} element={route.element} key={index}>
        {route.child && generateRoute(route.child)}
      </Route>
    ),
  );
};

export const routes: ReactNode = generateRoute(appRoutes);
