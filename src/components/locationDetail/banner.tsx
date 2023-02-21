import * as React from "react";
import { StaticData } from "../../../sites-global/staticData";
import OpenClose from "../commons/openClose";
import playStore from "../../images/Google-Play.png";
import appStore from "../../images/App-Store.png";
import arrow from "../../images/arrow.svg";

export type Address = {
  line1: string;
  city: string;
  region: string;
  postalCode: string;
  countryCode: string;
};

type Banner = {
  name?: string;
  address?: Address;
  hours?: any;
  timezone: any;
  clickcollect?: object;
  bannerImage?: any;
  c_locatorBannerAdditionalText?: string;
  children?: React.ReactNode;
  c_bannerCtas: any;
  bannerpara: any;
  c_bannerheading: any;
};

const renderPrettyAddress = (address?: Address) => {
  return (
    <>
      {address && (
        <span>
          {address.line1} in {address.city}, {address.region}
        </span>
      )}
    </>
  );
};

const Banner = (props: Banner) => {
  const {
    name,
    // address,
    // clickcollect,
    bannerImage,
    c_locatorBannerAdditionalText,
    // children,
    // c_bannerCtas,
    bannerpara,
    c_bannerheading,
  } = props;
  console.log("name", name);
  return (
    <>
      <div className="hero-section">
        <img
          className="hero-image"
          src={bannerImage?.url}
          alt="banner"
          width="1"
          height="1"
        />

        <div className="hero-content">
          <div className="container">
            <div
              className={`banner-text  ${
                props.hours && props.timezone ? "banner-dark-bg" : ""
              }`}
            >
              <h1>{name}</h1>
              {name ? (
                <p>{c_locatorBannerAdditionalText}</p>
              ) : (
                <>
                  <div className=" banner-heading">
                    <h1 className="text-7xl">{StaticData.bannerHeading}</h1>
                    <p>{StaticData.bannerPara} </p>
                  </div>
                  <div className="flex flex-row  justify-center !mt-2">
                    <button className="button-red text-lg flex">
                      {StaticData.bannerCta}
                    </button>
                  </div>
                </>
              )}

              {props.hours && props.timezone ? (
                <>
                  <div className="openClosestatus">
                    Station Hours :
                    <OpenClose
                      timezone={props.timezone}
                      hours={props.hours}
                      deliveryHours={props.hours}
                    ></OpenClose>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Banner;
