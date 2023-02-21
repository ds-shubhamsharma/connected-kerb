import { Link } from "@yext/pages/components";
import * as React from "react";
import { useState } from "react";

function Video(props: any) {
  const [highlightstring, setHighlightString] = useState("");
  function getId(url: any) {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return match && match[2].length === 11 ? match[2] : null;
  }
  function getCount(str: any) {
    let stringlen = str.split(" ").filter(function (num: any) {
      return num != "";
    }).length;
    // console.log(stringlen, "sam");
    // for Even condition
    if (stringlen % 2 == 0) {
      let startngstr = stringlen / 2;

      // console.log(startngstr, "starting");
    } else {
      let startngstr = (stringlen + 1) / 2;
      // console.log(startngstr, "starting");
      // if (str.indexof < startngstr) console.log(str, "elsestartng");
    }
  }

  const videoId = getId(props.c_kerbVideo.url);
  // console.log(props.c_videoList, "c_videoTitle");
  return (
    <>
      <div className="video-sec">
        <h2 className="">
          {props.c_videoTitle}{" "}
          {/* {getCount(props.c_videoTitle) % 2 == 0 ? <div>even</div> : <div>odd</div>} */}
        </h2>

        <div className=" video-sec-inner">
          <div className="krab-app-sec">
            <div className="app-heading">{props.c_videoDescription}</div>
            <ul>
              {props.c_videoList.map((e: any) => (
                <li>{e}</li>
              ))}
            </ul>
          </div>

          <div className="for-video"> {props.c_videoText} </div>

          <button className="py-5 px-20">
            <Link
              className="button-red"
              href="#"
              eventName={`cta`}
            >
              {props.c_videoCTA.label}
            </Link>
          </button>
        </div>
        <div className=" video-iframe">
          <iframe
            width="100%"
            height="500"
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
    </>
  );
}
export default Video;
