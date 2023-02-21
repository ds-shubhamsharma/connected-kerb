// import * as React from "react";
// import gallerybg from "../../images/faq-bg.png"

// import { useState, useEffect } from "react";
// import AccordionItem from "./AccordianItem";
// import { Link } from "@yext/pages/components";

// export default function Faq(props: any) {
//   const [current, setCurrent] = useState("");
//   const [isShow, setIsShow] = useState(false);
//   const [faqId, setFaqId] = useState(null);
//   const [faqClass, setFaqClass] = useState("");
//   const [activeIndex, setActiveIndex] = useState(0);
//   let preExpandedarr = [];

//   if (props.faqs.length > 0) {
//     props.faqs.map((e: any, i: Number) => {
//       if (i == 0) {
//         preExpandedarr = [e];
//       }
//     });
//   }
//   const isShowContent = (e: any) => {
//     setFaqId(e.currentTarget.id);

//     if (isShow) {
//       setIsShow(false);
//       setFaqClass("");
//     } else {
//       setIsShow(true);
//       setFaqClass("opened");
//     }
//   };
//   function setclass(e: any) {
//     setCurrent(e.target.id);
//   }
//   const renderedQuestionsAnswers = props.faqs.map((item: any, index: Number) => {
//     const showDescription = index === activeIndex ? "current" : "hidden";
//     const background = index === activeIndex ? "active" : "";
//     const fontWeightBold = index === activeIndex ? " font-weight-bold faq-tab py-0 mt-2" : "";
//     const ariaExpanded = index === activeIndex ? "true" : "false";
//     return (
//       <AccordionItem
//         showDescription={showDescription}
//         fontWeightBold={fontWeightBold}
//         ariaExpanded={ariaExpanded}
//         background={background}
//         item={item}
//         index={index}
//         onClick={() => {
//           setActiveIndex(index);

//         }}
//       />
//     );
//   });

//   return (
//     <>
//       <div className=" faq-main-sec">
//         <div className="gallery-bg"> <img className=" " src={gallerybg} width="38" height="35" alt="" /></div>

//         <div className=" faq-card ">
//           <div className="faq-sec-inner">
//             <h2 className="">{props.c_fAQs}{" "}</h2>
//             <div className="faq-tabs">{renderedQuestionsAnswers}</div>
//             <div className="view-more">
//               <Link href={props.c_faqCTA.link}className="button-red" eventName={`accordian`} >{props.c_faqCTA.label}</Link>
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }

import { Link } from "@yext/pages/components";
import * as React from "react";
import { useEffect, useState } from "react";
type Faq = {
  prop: any;
};

const Faq = (faqData: any) => {
  const [faq_Data, setFaq_Data] = useState([]);
  const [faqClass, setFaqClass] = useState("");
  const [leftFaqLen, setLeftFaqLen] = useState(0);

  const [selected, setselected] = useState(null);

  const isShowContent = (e: any, index: any) => {
    setselected(index);
    let parent = e.target.parentNode;
    let parent2 = e.target.parentNode.parentNode;

    if (
      parent.classList.contains("opened") ||
      parent2.classList.contains("opened")
    ) {
      setFaqClass("");
    } else {
      var acc = document.getElementsByClassName("faq-block");
      for (let s = 0; s < -1; s++) {
        acc[s].classList.remove("opened");
      }

      setFaqClass("opened");
    }
  };

  useEffect(() => {
    setFaq_Data(faqData.prop);
    let left = Math.round(faqData.prop.length);
    let right = faqData.prop.length - left;
    setLeftFaqLen(left);
  });
  return (
    <>
      <div className="faq-main-sec">
        {" "}
      
        <div className=" faq-card ">
          <h2 className="">{faqData.c_faqText} </h2>
          <div className="faq-sec bg-light">
            <div className="container mx-auto">
              <div className="faq-blocks">
                <div className="left-faq">
                  {faq_Data.map((i: any, index: any) => {
                    if (index + 1 <= leftFaqLen) {
                      return (
                        <div
                          id={index}
                          className={
                            selected == index
                              ? `faq-block ${faqClass}`
                              : "faq-block"
                          }
                          key={index}
                        >
                          <h4
                            className="faq-title"
                            onClick={(e) => isShowContent(e, index)}
                          >
                            {i.name} <span className="faq-icon"></span>
                          </h4>

                          <>
                            <div className="faq-content">
                              <p>{i.answer}</p>
                            </div>
                          </>
                        </div>
                      );
                    }
                  })}
                </div>

              </div>
             { faqData.c_faqCTA.link ?<div className="view-more">
                {" "}
                <Link
                  href={faqData.c_faqCTA.link}
                  className=""
                  eventName={`accordian`}
                >
                  {faqData.c_faqCTA.label}
                </Link>{" "}
              </div>:""}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Faq;
