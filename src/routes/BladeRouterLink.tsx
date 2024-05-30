import React from "react";
import { Link as BladeLink } from "@razorpay/blade/components";
import {
  Link as ReactRouterLink,
  useHref,
  useLinkClickHandler,
} from "react-router-dom";

import type { LinkProps as RouterLinkProps } from "react-router-dom";
import type { LinkProps as BladeLinkProps } from "@razorpay/blade/components";

const BladeRouterLink = React.forwardRef<
  HTMLAnchorElement,
  BladeLinkProps &
    Omit<RouterLinkProps, keyof React.AnchorHTMLAttributes<HTMLAnchorElement>>
>(({ onClick, replace = false, state, target, to, ...rest }, ref) => {
  let href = useHref(to);
  let handleClick = useLinkClickHandler(to, {
    replace,
    state,
    target,
  });

  return (
    // @ts-expect-error no overlap between react router vs blade link types
    <BladeLink
      {...rest}
      href={href}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) {
          handleClick(event as never);
        }
      }}
      ref={ref}
      target={target}
    />
  );
});

export { BladeRouterLink };
