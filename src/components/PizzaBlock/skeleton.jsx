import React from "react";
import ContentLoader from "react-content-loader";

const Skeleton = () => (
  <div className="pizza-block">
    <ContentLoader
      speed={2}
      width={1000}
      height={500}
      viewBox="0 0 1000 500"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb"
    >
      <circle cx="130" cy="130" r="130" />
      <rect x="0" y="276" rx="6" ry="6" width="263" height="27" />
      <rect x="0" y="327" rx="13" ry="13" width="264" height="75" />
      <rect x="5" y="427" rx="7" ry="7" width="90" height="27" />
      <rect x="115" y="419" rx="14" ry="14" width="152" height="45" />
    </ContentLoader>
  </div>
);

export default Skeleton;
