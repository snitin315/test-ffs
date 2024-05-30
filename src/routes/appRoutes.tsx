import HomePage from "../pages/home/HomePage";
import Parameters from "../pages/parameters/Parameters";
import Rules from "../pages/rules/Rules";
import RuleSet from "../pages/ruleset/RuleSet";
import RuleSetEdit from "../pages/ruleset/RuleSetEdit";
import RuleSetCreate from "../pages/ruleset/RuleSetCreate";
import { RouteType } from "./config";

const appRoutes: RouteType[] = [
  {
    element: <HomePage />,
    index: true,
    path: "/",
    state: "home",
  },
  {
    element: <Parameters />,
    path: "/parameters",
    state: "parameters",
    sidebarProps: {
      displayText: "Parameters",
    },
  },
  {
    element: <Rules />,
    path: "/rules",
    state: "rules",
    sidebarProps: {
      displayText: "Rules",
    },
  },
  {
    element: <RuleSet />,
    path: "/rule-sets",
    state: "rulesets",
    sidebarProps: {
      displayText: "Rule Sets",
    },
  },
  {
    element: <RuleSetCreate />,
    path: "/rule-set/create",
    state: "ruleSetCreate",
  },
  {
    element: <RuleSetEdit />,
    path: "/rule-set/edit",
    state: "ruleSetEdit",
  },
];

export default appRoutes;
