import React from "react";
import Head from "next/head";

import FACEBOOK_PIXEL_1 from "./Facebook/pixel-1";

// eslint-disable-next-line import/no-anonymous-default-export, react/display-name
export default ({ name }) => {
  return <Head>{name === "FACEBOOK_PIXEL_1" && <FACEBOOK_PIXEL_1 />}</Head>;
};
