import { Link } from "@yext/pages/components";
import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import PhotoSlider from "./PhotoSlider";

export default function About(props: any) {
  return (
    <>
      <div className="about-sec ">
        <div className="about-inner-sec">
          <div className="about-images-sec">
                <ul className=" ">
                  
                    {props.c_slide?.map((e: any) => (
                      <li>
                      <img  src={e.url} alt='' />
                      </li>
                    ))}
                    {/* <PhotoSlider c_slide={props.slide} /> */}
               

                </ul>
          </div>

          <div className="about-content">
            <h2 className="uppercase">{StaticData.About}</h2>


            <div className="inner-ab-content"><span dangerouslySetInnerHTML={{ __html: props.description }} />
              {props.c_learnMoreCTA.label ? (
                <Link
                  href={props.c_learnMoreCTA.link}
                  eventName={`learnMoreCTA`}
                  className="dtl-readmore"
                >
                  {props.c_learnMoreCTA.link?props.c_learnMoreCTA.label:""}
                </Link>
              ) : (
                ""
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
