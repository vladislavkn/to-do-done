import React, { useEffect, useMemo } from "react";
import useStore from "../store";

type RouterViewProps = {
  initial: string;
  routes: {
    [key: string]: React.FC;
  };
};

const RouterView: React.FC<RouterViewProps> = ({ routes, initial }) => {
  const [navigate, screen] = useStore((state) => [
    state.navigate,
    state.screen,
  ]);

  useEffect(() => {
    navigate(initial);
  }, []);

  const Component = useMemo(
    () => (routes.hasOwnProperty(screen) ? routes[screen] : null),
    [screen]
  );

  return Component ? <Component /> : null;
};

export default RouterView;
