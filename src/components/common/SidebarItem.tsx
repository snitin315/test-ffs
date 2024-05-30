import { RouteType } from "../../routes/config";
import { BladeRouterLink } from "../../routes/BladeRouterLink";
import { useContext } from "react";
import DomainContext from "../../context/DomainContext";

type Props = {
  item: RouteType;
};

const SidebarItem = ({ item }: Props) => {
  const { domain } = useContext(DomainContext);

  return item.sidebarProps && item.path ? (
    <BladeRouterLink
      to={domain === "" ? "/" : item.path}
      variant="button"
      color="neutral"
      isDisabled={domain === "" ? true : false}
    >
      {item.sidebarProps?.displayText}
    </BladeRouterLink>
  ) : null;
};

export default SidebarItem;
