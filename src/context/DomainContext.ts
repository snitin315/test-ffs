import React from "react";

type DomainContextType = {
  domain: string;
  setDomain: (value: string) => void;
  domainCreated: boolean;
  setDomainCreated: (value: boolean) => void;
  domainStatus: string;
  setDomainStatus: (status: string) => void;
};

const defaultContextValue = {
  domain: "",
  setDomain: () => {},
  domainCreated: false,
  setDomainCreated: () => {},
  domainStatus: "",
  setDomainStatus: () => {},
};

const DomainContext =
  React.createContext<DomainContextType>(defaultContextValue);
 
export default DomainContext;
