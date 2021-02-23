import React, { useEffect, useMemo } from "react";
import useStore from "../store";

type RouterViewProps = {
  initial: string;
  routes: {
    [key: string]: React.FC;
  };
};

const RouterView: React.FC<RouterViewProps> = ({ routes, initial }) => {
  const screen = useStore((state) => state.screen);
  const navigate = useStore((state) => state.navigate);
  useEffect(() => {
    navigate(initial);
  }, []);

  const Component = useMemo(() => {
    const ComponentPare = Object.entries(routes).find(([s]) => s === screen);
    return ComponentPare !== undefined ? ComponentPare[1] : null;
  }, [screen]);

  return Component ? <Component /> : null;
};

export default RouterView;
