import routes from "./routes";
import React, { useMemo } from "react";
import useStore from "./store";

const RouterView: React.FC = () => {
  const screen = useStore((state) => state.screen);

  const Component = useMemo(
    () => (routes.hasOwnProperty(screen) ? routes[screen] : null),
    [screen]
  );

  return Component ? <Component /> : null;
};

export default RouterView;
