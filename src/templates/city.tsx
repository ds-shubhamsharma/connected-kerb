import * as React from "react";
// import Banner from "../components/banner";
import GetDirection from "../components/commons/GetDirection";
import constant from "../constant";
// import { stagingBaseUrl } from "../constants";
// import bannerImage from "../images/banner.png"
import Phonesvg from "../images/phone.svg";
import faviconA from "../images/faviconA.jpg";
import map from "../images/map.svg";
import "../index.css";
var currentUrl = "";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
} from "@yext/pages";
import BreadCrumbs from "../components/layouts/Breadcrumb";
import Banner from "../components/locationDetail/banner";
import { StaticData } from "../../sites-global/staticData";
import {
  Addresssvg,
  mobilesvg,
  Openclose,
  regionNames,
  slugify,
  stagingBaseurl,
} from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import Address from "../components/commons/Address";
import PageLayout from "../components/layouts/PageLayout";
import OpenClose from "../components/commons/openClose";
import { Link } from "@yext/pages/components";
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "city",
    filter: {
      entityTypes: ["ce_city"],
      savedFilterIds: ["dm_stores-directory_address_city"],
    },
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.mainPhone",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.address",
      "dm_directoryChildren.hours",
      "dm_directoryChildren.yextDisplayCoordinate",
    ],
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  let url: any = "";
  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    } else if (i.meta.entityType.id == "ce_region") {
      url = `${url}/${i.slug}/${document.slug.toString()}.html`;
    }
  });
  return url;
  
  // if (document.dm_directoryParents) {
  //   document?.dm_directoryParents?.map((i: any) => {
  //     if (i.meta?.entityType.id == "ce_country") {
  //       currentUrl = `${i.slug}/${document.slug.toString()}.html`;
  //     } else if (i.meta?.entityType.id == "ce_region") {
  //       let url = `${document?.dm_directoryParents?.slug}/${
  //         i.slug
  //       }/${document.slug.toString()}.html`;
  //       currentUrl = url;
  //     }
  //   });
  //   return `/${currentUrl}`;
  // } else {
  //   return `/${document.slug.toString()}.html`;
  // }


};


export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  var url1 = "gb";
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: faviconA,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Connected Kerb:EV Stations",
        },
      },

      {
        type: "meta",
        attributes: {
          name: "robots",
          content: "noindex, nofollow",
        },
      },

      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${stagingBaseurl}${url1}/${document.slug}.html`,
        },
      },
      //og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl}${url1}/${document.slug}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.name}`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      // {
      //   type: "meta",
      //   attributes: {
      //     name: "twitter:url",
      //     content: stagingBaseurl,
      //   },
      // },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },
    ],
  };
};

const City: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    dm_directoryParents,
    dm_directoryChildren,
    c_globalData,
    c_canonical,
    c_metaDescription,
    c_metaTitle,
    _site,
  } = document;

  var address;
  // var sortedChildren = dm_directoryChildren.sort(function (a: any, b: any) {
  //   var a = a.name;
  //   var b = b.name;
  //   return a < b ? -1 : a > b ? 1 : 0;
  // });

  let slugString = "";
  document.dm_directoryParents?.map((e: any) => {
    slugString += e.slug + "/";
  });

  const allCities = 
  dm_directoryChildren &&
  dm_directoryChildren?.map((e: any) => {
    var origin: any = null;
    if (e.address.city) {
      origin = e.address.city;
    } else if (e.address.region) {
      origin = e.address.region;
    } else {
      origin = e.address.country;
    }

    let url = "";
    if (!e.slug) {
      let slugString =e.name;
      let slug = slugify(slugString);
      // console.log('slug', slug);
      url = `/${slug}.html`;
    } else {
      url = `/${e.name?.toString()}.html`;
    }


    return (
      <>
        <div className="c_location">
          <div className=" city-location">
            <div className="location-name-miles icon-row">
              <div className="flex">
                <img src={map} alt="" width="20" height="20" />
                <h2>
                  <Link
                    className="inline-block notHighlight px-1 text-black"
                    href={url}
                    eventName={`details`}
                  >
                    {e.name}
                  </Link>
                </h2>
              </div>
            </div>
            <div className="icon-row">
              <Address address={e.address} />
            </div>
            <div className="icon-row">
              <div className="icon" />

              <div className="content-col flex">
                <img src={Phonesvg} alt="" width="20" height="20" />
                <Link href={`tel:${e.mainPhone}`}>{e.mainPhone}</Link>
              </div>
            </div>
            <div className="icon-row">
              <div className="icon">
                {" "}
                {/* <img src={} className=" " width="20" height="20" alt="" />{" "} */}
              </div>
              <div className="content-col open-now-string">
                {typeof e.hours?.reopenDate != "undefined" ? (
                  <h6>{StaticData.tempClosed}</h6>
                ) : (
                  <>
                    <div className="flex">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="15"
                        height="15"
                        viewBox="0 0 20 20"
                      >
                        <path
                          d="M971,4616a10,10,0,1,1,10-10A10.014,10.014,0,0,1,971,4616Zm0-18a8,8,0,1,0,8,8A8.01,8.01,0,0,0,971,4598Zm-.707,8.71,4,4,1.414-1.42-3.707-3.7V4600h-2v6A1,1,0,0,0,970.293,4606.71Z"
                          transform="translate(-961 -4596)"
                          fill=""
                          fill-rule="evenodd"
                        />
                      </svg>{" "}
                      <OpenClose
                        timezone={e.timezone}
                        hours={e.hours}
                        deliveryHours={e.hours}
                      ></OpenClose>
                    </div>
                  </>
                )}
              </div>
            </div>
            <div className="icon-row content-col availability-col flex flex-row">
              <div className="button-bx flex flex-row">
                <Link
                  className="btn"
                  href={url}
                  eventName={`storeDetails`}
                >
                  View Store Detail
                </Link>
                <GetDirection
                  buttonText="Direction"
                  address={e.address}
                  latitude={e.yextDisplayCoordinate.latitude}
                  longitude={e.yextDisplayCoordinate.longitude}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  });
  c_globalData &&
    c_globalData?.map((i: any) => {
      address = i.address ? i.address : [];
    });

  var url: any = "";

  document.dm_directoryParents?.map((i: any) => {
    if (i.meta.entityType.id == "ce_country") {
      url = `${i.slug}`;
    }
  });
  let breadcrumbScheme: any = [];
  let currentIndex: any = 0;
  dm_directoryParents &&
    dm_directoryParents?.map((i: any, index: any) => {
      currentIndex = index;
      if (index != 0) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id": `${constant.stagingBaseurl}${i.slug}.html`,
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: currentIndex + 1,
    item: {
      "@id": `${constant.stagingBaseurl}${
        dm_directoryParents[1].slug
      }/${document.slug.toString()}.html`,
      name: document.name,
    },
  });
  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Store",
          name: "Connected Kerb",
          //   url: _site.c_canonical,
          // logo: `${document.c_ogImage ? document.c_ogImage.map((result:any)=>{return result.url}) : ""}`
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />
      <PageLayout prop={_site} datas={undefined}>
        <Banner name={name} timezone={undefined} />

        <BreadCrumbs
          name={name}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>

        <div className="content-list city-page">
          <div className="container mx-auto">
            <div className="sec-title">
              <h2>
                Available Stations in {name}
                {/* {regionNames.of(document.dm_directoryParents[1].name)},{" "}{document.dm_directoryParents[2].name}{" "} */}
              </h2>
            </div>
            <div className="flex flex-wrap justify-center items-start -mx-2.5 lg:-mx-[.9375rem]">
              {allCities}
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default City;
