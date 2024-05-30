import { useState } from "react";
import DomainContext from "./DomainContext";

const DomainContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [domain, setDomain] = useState<string>("");
  const [domainCreated, setDomainCreated] = useState<boolean>(true);
  const [domainStatus, setDomainStatus] = useState<string>("");

  return (
    <DomainContext.Provider
      value={{
        domain,
        setDomain,
        domainCreated,
        setDomainCreated,
        domainStatus,
        setDomainStatus,
      }}
    >
      {children}
    </DomainContext.Provider>
  );
};

export default DomainContextProvider;
