import { useContext } from "react";
import DomainContext from "../../context/DomainContext";
import { Navigate } from "react-router-dom";

const Rules = () => {

  const { domain } = useContext(DomainContext);

  return (
    <>
    {domain == "" ? (
        <Navigate to="/" />
      ) : (
     "Create Rules"
      )}
    </>
  )
}

export default Rules
