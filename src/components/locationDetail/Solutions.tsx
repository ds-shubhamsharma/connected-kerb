import { Link } from "@yext/pages/components";
import * as React from "react";
import PhotoSlider from "./PhotoSlider";

// function getCount(str: any) {
//   return str.split(" ").filter(function (num: any) {
//     return num != "";
//   }).length;
// }

export default function Solutions(props: any) {
  return (
    <>
     <div className="solutions-sec">
      <h2>   {props.c_para}     
      {/* {console.log("Total Words in String: " + getCount(props.c_para))} */}
        {/* {getCount(props.c_para) % 2 == 0 ? <div>even</div> : <div>odd</div>} */}
      </h2>

      <div className="solution-inner">
        {/* <div className="rounded-lg shadow-lg bg-white max-w-sm"></div> */}

        {props.c_card.map((e: any) => (
          <>
            <div className="sol-card">
              <img src={e.pic.url} alt="" className="" />
              <h3 className="">
                {e.heading}
              </h3>
              <p className="">{e.para}</p>
              <button className="py-5 px-20">
            <Link
              className="button-red"
              href="#"
              eventName={`cta`}
            >
              {e.button.label}
            </Link>
          </button>
            </div>
          </>
        ))}
      </div>
      </div>
    </>
  );
}
