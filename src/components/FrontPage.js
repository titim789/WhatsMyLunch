import { useEffect, useLocation } from "react";

const FrontPage = ({ checkAuth }) => {
  useEffect(checkAuth, []);
  return <div>HELLO WORLD</div>;
};

export default FrontPage;
