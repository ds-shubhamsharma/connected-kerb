import * as React from "react";
import Hours from "../commons/hours";
import mapimage from "../../images/map.svg";
import Phonesvg from "../../images/phone.svg";
import Address from "../commons/Address";
import GetDirection from "../commons/GetDirection";
import { StaticData } from "../../../sites-global/staticData";
import Holidayhours from "./Holdayhours";
import Model from "./Model";
import ChargeStatus from "../commons/ChargeStatus";
import { Link } from "@yext/pages/components";
import Facilities from "./Facilities";

const Contact = (props: any) => {
  const {
    id,
    address,
    phone,
    c_features,
    latitude,
    longitude,
    hours,
    c_specific_day,
    additionalHoursText,
    what3WordsAddress,
  } = props;
  // console.log('what3WordsAddress', what3WordsAddress)
  return (
    <>
      <div className="address-main-sec">
        <h4 className="box-title">Station Info</h4>

        <div className="icon-row content-col">
          <div className="icon">
            {" "}
            <img className=" " src={mapimage} width="20" height="20" alt="" />
          </div>
          <h6>{StaticData.Address}</h6>
          <Address address={address} />
        </div>

        {phone ? (
          <div className="icon-row">
            <div className="icon">
              {" "}
              <img className=" " src={Phonesvg} width="22" height="22" alt="" />
            </div>
            <div className="content-col">
              <h6>{StaticData.Telephone}</h6>
              {phone}
            </div>
          </div>
        ) : (
          ""
        )}
        {/* {hours ? (
          <div className="icon-row content-col availability-col"></div>
        ) : (
          ""
        )}
             */}

        {/* <ChargeStatus id={id} /> */}

        {/* <div className="icon-row">
          <div className="icon">
            <img src={word} alt="" />
          </div>
          <div className="content-col">
            <a
              target="_blank"
              href={what3WordsAddress ? what3WordsAddress : ""}
            >
              {" "}
              What3Words{" "}
            </a>
          </div>
        </div> */}

        <div className="button-bx">
          {/* <a className="Link btn">
            <a href={`tel:${phone}`}>Call Station</a>
          </a> */}
          <GetDirection
            classList="Link btn"
            buttonText="Direction"
            address={address}
            latitude={latitude}
            longitude={longitude}
          />
        </div>
      </div>
       {hours && typeof hours.monday != "undefined" ? (
        <div className="hours">
          <div className="hours-sec">
            <div className="title-with-link-1">
              <h4 className="box-title">{"Store Opening Hours"}</h4>
            </div>
            <div className="hours-div mb-5 md:mb-1 flex flex-col">
              {hours.holidayHours && typeof hours.reopenDate == "undefined" ? (
                <>
                  <Model
                    name={StaticData.Holdiay}
                    holidayHours={hours.holidayHours}
                    c_specific_day={c_specific_day}
                  />
                </>
              ) : (
                ""
              )}

              {/* <div className="title-with-link-1">
        <h4 className="box-title">{"Store Hours"}</h4>        
      </div> */}
              {hours && (
                <Hours
                  title={"Store Opening Hours"}
                  additionalHoursText={additionalHoursText}
                  hours={hours}
                  c_specific_day={c_specific_day}
                />
              )}
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Contact;
