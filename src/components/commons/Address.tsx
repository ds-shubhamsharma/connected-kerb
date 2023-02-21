import * as React from "react";
import { regionNames } from "../../../sites-global/global";

const Address = (props: any) => {
    const { address } = props;
    var gmaps = "https://www.google.com/maps/dir/?api=1&destination=";
    var gmapsAddress = gmaps.concat(address.line1, ' ', address.city, ' ', address.region, ' ', address.postalCode);
    var gmapsLink = gmapsAddress.concat('"');

  return (
    <>
      <div className="address">
        
            <div>{address.line1}</div>
            {address.line2 && (<div>{address.line2}</div>)}
            <div>{address.city}, {address.region} </div>
            {<div> {regionNames.of(address.countryCode)},{address.postalCode}</div>}
        
      </div>
    </>
  );
};

export default Address;
