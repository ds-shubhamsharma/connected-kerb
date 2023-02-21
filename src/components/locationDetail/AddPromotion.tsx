import * as React from "react";
import { Link } from "@yext/pages/components";

const AddPromotion = (Data: any) => {
  return (
    <>
      <div className="promo-sec">
        <div className="container-custom">
          <div className="promo-content ">
            <h2> {Data.c_mobileHeading}</h2>
            <p>{Data.c_mobileDescription}</p>
            <h3>{Data.c_mobile}</h3>
          </div>
          {Data.c_mobilePointImage?.map((imgs: any) => {
            return (
              <>
                <div className="promo-sec-inner">
                  <div className="img-block">
                    <div className="download-app">
                      <a href="#" className="pr-8">
                        <img src={imgs.url} alt="" />
                      </a>
                    </div>
                  </div>
                </div>
              </>
            );
          })}
          {/* <div className="promo-sec-inner">

          <div className="img-block">
            <img src={mobile} alt="" />
          </div>
          <div className="promo-content ">
            <h2> {Data.c_mobileHeading}</h2>
            <p>{Data.c_mobileDescription}</p>
            <h3>{Data.c_mobile}</h3>
              <div className="download-app">
                <a
                  href="#"
                  className="pr-8"
                >
                  <img src={apple} alt="" />
                </a>
                <a
                  href="#"
                  className=""
                >
                  {" "}
                  <img src={google} alt=""/>
                </a>
              </div>
          </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
export default AddPromotion;
