import * as React from "react";
import { CardComponent } from "@yext/search-ui-react";
import { Location } from "../../types/search/locations";
import Hours from "../commons/hours";
import GetDirection from "../commons/GetDirection";
import Opening from "../commons/openClose";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg";
import timesvg from "../../images/watch-icn.svg";
import Address from "../commons/Address";
import OpenClose from "../commons/openClose";
import ChargeStatus from "../commons/ChargeStatus";
import { Openclose, View_Store } from "../../../sites-global/global";
import { StaticData } from "../../../sites-global/staticData";
import { Link } from "@yext/pages/components";
import detail from "../../images/detail.svg";
import facilities from "../../images/facilities.png";
import Facilities from "../locationDetail/Facilities";

const metersToMiles = (meters: number) => {
  const miles = meters * 0.000621371;
  return miles.toFixed(2);
};
let array = [];

function opentime(e: any) {
  var closethis = e.target.closest(".lp-param-results");
  if (
    closethis
      .querySelector(".storelocation-openCloseTime")
      .classList.contains("hidden")
  ) {
    closethis
      .querySelector(".storelocation-openCloseTime")
      .classList.remove("hidden");
  } else {
    closethis
      .querySelector(".storelocation-openCloseTime")
      .classList.add("hidden");
  }
}

const LocationCard: CardComponent<Location> = ({ result }) => {
  const { address, c_features } = result.rawData;
  // console.log('c_features', result.rawData)
  let url = "";

  var name: any = result.rawData.name?.toLowerCase();
  // var region: any = result.rawData.address.region?.toLowerCase();
  // var initialregion: any = region.toString();
  // var finalregion: any = initialregion.replaceAll(" ", "-");
  var city: any = result.rawData.address.city?.toLowerCase();
  var initialrcity: any = city.toString();
  var finalcity: any = initialrcity.replaceAll(" ", "-");
  var string: any = name.toString();
  let result1: any = string.replaceAll(" ", "-");
  if (!result.rawData.slug) {
    url = `${result1}.html`;
  } else {
    url = `/${result.rawData.slug.toString()}.html`;
  }
  return (
    <div
      className={`location result-list-inner-${result.index} result`}
      id={`result-${result.index}`}
    >
      <div className="result-inner ">
        <div className="center-column">
          <div className="lp-param-results lp-subparam-hours">
            <div className="location-name-miles icon-row">
              <div className="icon">
                {" "}
                <img
                  className=" "
                  src={mapimage}
                  width="20"
                  height="20"
                  alt=""
                />
              </div>
              <h2>
                <a className="inline-block text-black notHighlight" href={url}>
                  {result.rawData.name}
                </a>
              </h2>
              {typeof result.distance != "undefined" ? (
                <div className="distance">
                  {metersToMiles(result.distance)}{" "}
                  <span>{StaticData.miles}</span>
                </div>
              ) : (
                ""
              )}
            </div>
            <div className="icon-row content-col address-with-availablity">
              <Address address={address} />
            </div>

            <div className="icon-row">{StaticData.Telephone}
              <div className="icon">
                {" "}
                <img
                  className=" "
                  src={Phonesvg}
                  width="20"
                  height="20"
                  alt=""
                />
              </div>
              <div className="content-col">
                <a id="address" className="notHighlight" href={`tel:${result.rawData.mainPhone}`}>
                  {result.rawData.mainPhone}
                </a>
              </div>
            </div>

            {result.rawData.hours ? (
              <>
                <div className="icon-row">
                  {result.rawData.hours?.reopenDate ? (
                    <>
                      <div className="icon">
                        {" "}
                        <img
                          className=" "
                          src={timesvg}
                          width="20"
                          height="20"
                          alt=""
                        />{" "}
                      </div>
                      <div
                        className="cursor-pointer flex open-now-string items-center "
                        data-id={`main-shop-${result.rawData.id}`}
                        onClick={opentime}
                      >
                        {StaticData.tempClosed}
                      </div>
                    </>
                  ) : (
                    <>
                      {" "}
                      <div className="icon">
                        {" "}
                        <img
                          className=" "
                          src={timesvg}
                          width="20"
                          height="20"
                          alt=""
                        />{" "}
                      </div>{StaticData.openingHours}
                      <div
                        className=" cursor-pointer  flex open-now-string items-center "
                        data-id={`main-shop-${result.rawData.id}`}
                        onClick={opentime}
                      >
                        <OpenClose
                          timezone={result.rawData.timezone}
                          hours={result.rawData.hours}
                          deliveryHours={result.rawData.hours}
                        ></OpenClose>
                        <div dangerouslySetInnerHTML={{ __html: Openclose }} />
                      </div>
                    </>
                  )}

                  <div
                    className={`storelocation-openCloseTime  capitalize hidden`}
                  >
                    {typeof result.rawData.hours === "undefined" ? (
                      ""
                    ) : (
                      <Hours
                        key={result.rawData.name}
                        additionalHoursText={result.rawData.additionalHoursText}
                        hours={result.rawData.hours}
                      />
                    )}
                  </div>
                </div>
              </>
            ) : (
              ""
            )}

            <div className="">
              {c_features ? <Facilities c_features={c_features} /> : ""}
            </div>

            {/* <ChargeStatus id={result.rawData.id} /> */}

            <div className="button-bx">
              <Link
                type="button"
                href={url}
                eventName={`stationDetail`}
                className="btn notHighlight "
              >
                {/* <div dangerouslySetInnerHTML={{__html: View_Store}}/> */}
               
                {StaticData.StoreDetailbtn}
              </Link>
              {result.rawData.displayCoordinate ? (
                <GetDirection
                  className="notHighlight"
                  buttonText={StaticData.getDirection}
                  address={address}
                  latitude={result.rawData.displayCoordinate?.latitude}
                  longitude={result.rawData.displayCoordinate?.longitude}
                />
              ) : (
                <GetDirection
                  className="notHighlight"
                  buttonText={StaticData.getDirection}
                  address={address}
                  latitude={result.rawData.yextDisplayCoordinate?.latitude}
                  longitude={result.rawData.yextDisplayCoordinate?.longitude}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationCard;
