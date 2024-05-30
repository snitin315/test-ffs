import { useContext } from "react";
import DomainContext from "../../context/DomainContext";
import { Navigate } from "react-router-dom";

const Parameters = () => {
  const { domain } = useContext(DomainContext);

  return <>{domain == "" ? <Navigate to="/" /> : "Create Parameters"}</>;
};

export default Parameters;
