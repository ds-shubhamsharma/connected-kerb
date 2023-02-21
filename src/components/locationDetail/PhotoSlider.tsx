import * as React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import { logo } from "../../../sites-global/global";

const PhotoSlider = (props: any) => {
  const { c_slide, height, width } = props;
  // console.log("hjsjkdfg=======", c_slide);
  const photos = c_slide?.map((element: any) => {
    return (
      <SplideSlide>
        <img height={height} width={width} src={element?.url} alt="jadbhfm"/>
      </SplideSlide>
    );
  });
  return (
    <>
      <Splide aria-label="Photo Slider">{photos}</Splide>
    </>
  );
};

export default PhotoSlider;
