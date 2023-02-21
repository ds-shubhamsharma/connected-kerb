import * as React from "react";
import Header from "./header";
import Footer from "./footer";
import Nav from "./Nav";

type Props = {
  prop: any;
  title?: string;
  _site?: any;
  datas:any
  children?: React.ReactNode;
};

const PageLayout = ({children, prop }: Props) => {
  return (
    <div className="min-h-screen">
      <Header prop={prop.c_menu} data={prop.c_contactUs} facebookPageUrl={undefined} instagramHandle={undefined} twitterHandle={undefined} c_tikTok={undefined} />
      <Nav/>
      {children}
      <Footer prop={prop.c_footer} social={prop.c_social} cta={prop.c_socialButton} socials={prop.c_socials} c_environmentalPolicy={prop.c_environmentalPolicy} c_socials={prop.c_socials}/>
    </div>
  );
};

export default PageLayout;
