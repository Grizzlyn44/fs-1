import { Fragment } from "react";
import { global as globalResources } from "./lang/global";

export const RESOURCE_GLOBAL = "global";

const primaryLang = "en";

const getResource = (location, key, primaryLang) => {
  let resource = "...";
  switch (location) {
    case RESOURCE_GLOBAL:
      resource = globalResources[key][primaryLang];
      break;
    default:
      console.log("Resource is not defined !", location, key, primaryLang);
      break;
  }
  return resource;
};

const Resource = props => {
  const { locationResource, keyResource, isHtml } = props;
  const resource = getResource(locationResource, keyResource, primaryLang);

  if (isHtml) {
    return <div dangerouslySetInnerHTML={{ __html: resource }} />;
  }

  return <Fragment>{resource}</Fragment>;
};

export default Resource;
