import * as React from "react";
import Link from "./Link";

type Cta = {
  buttonText: string;
  url?: string;
  style?: string;
};

const Cta = (props: Cta) => {
  const { 
    buttonText, 
    url,
    style 
  } = props;

  return (
    <Link href={url} eventName={`cta`} className={`${style}` + " py-4 px-6 text-base font-bold text-white rounded-lg drop-shadow-md"} rel="noopener noreferrer">
      {buttonText}
    </Link>
  );
};

export default Cta;
