import * as React from "react";
import facilities from "../../images/facilities.png";
import { StaticData } from "../../../sites-global/staticData";
import { useEffect } from "react";
const Facilities = (props: any) => {
  const c_features = props.c_features;

  return (
    <>
      {c_features ? (
        <div className="flex py-5 break-normal">
          <img src={facilities} width="20" height="20" alt="" />
          <div className="px-2 break-all">
            {StaticData.facilities} {c_features}
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};
export default Facilities;
