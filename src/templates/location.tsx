import * as React from "react";
import Cta from "../components/commons/cta";
import Contact from "../components/locationDetail/contact";
import ApiCall from "../Apis/ApiCall";
import Nearby from "../components/locationDetail/Nearby";
import { CustomFieldDebuggerReactProvider } from "@yext/custom-field-debugger";
import { JsonLd } from "react-schemaorg";
import Opening from "../components/commons/openClose";
import { nearByLocation } from "../types/nearByLocation";

import IframeMap from "../components/locationDetail/IframeMap";
import "../index.css";
import {
  Template,
  GetPath,
  GetRedirects,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  GetHeadConfig,
  TransformProps,
  HeadConfig,
} from "@yext/pages";
import PageLayout from "../components/layouts/PageLayout";
import { fetch } from "@yext/pages/util";
import Nav from "../components/layouts/Nav";
import Footer from "../components/layouts/footer";
import Menu from "../components/locationDetail/Menu";
import PhotoSlider from "../components/locationDetail/PhotoSlider";
import PhotoGallery from "../components/locationDetail/PhotoGallery";
import About from "../components/locationDetail/About";
// import Breadcrumb from "../components/layouts/Breadcrumb";
import CustomMap from "../components/locationDetail/CustomMap";
import BreadCrumbs from "../components/layouts/Breadcrumb";
// import StoreHighlight from "../components/locationDetail/SoreHighlight";
import OpenClose from "../components/commons/openClose";
import { StaticData } from "../../sites-global/staticData";

import {
  apikey_for_entity,
  baseuRL,
  stagingBaseurl,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
} from "../../sites-global/global";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
  Link,
} from "@yext/pages/components";
import { AnswerExperienceConfig } from "../../sites-global/global";
import Header from "../components/layouts/header";
import Example from "../components/locationDetail/AccordianItem";
import Video from "../components/locationDetail/Video";
import AddPromotion from "../components/locationDetail/AddPromotion";
import Solutions from "../components/locationDetail/Solutions";
import Faqs from "../components/locationDetail/Faqs";
import Banner from "../components/locationDetail/banner";

/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "location_data1",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "hours",
      "slug",
      "timezone",
      "yextDisplayCoordinate",
      "displayCoordinate",
      "cityCoordinate",
      /*mobile section*/
      "c_mobileText",
      "c_mobileHeading",
      "c_mobileDescription",
      "c_mobile",
      "c_mobilePointImage",
      /** solution Card */
      "c_solutionsTitle",
      "c_card",
"c_solutionsCTA",

      /** Api Data */
      "c_c_evses",

      /**Banner  */
      "c_banners",
      "c_bannerCtas",
      "c_bannerheading",
      "c_bannerpara",
      /**video section */
      "c_videoTitles",
      "c_videoDescription",
      "c_kerbVideo",
      "c_videoCTA",
      "c_videoText",
      "c_videoList",
      /** About section */

      "c_aboutTitle",
      "c_photo",
      "description",
      "c_learnMoreCTA",
      "c_slide",
      /** Key Features */
      "c_features",
      "c_facility",
      /**Faq Section */
      "c_faqText",
      "c_faq.name",
      "c_faq.answer",
      "c_faqCTA",
      /**Near By section */
      "c_nearbyText",
      /**dm pages  */
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.meta.entityType",
      "dm_directoryParents.c_addressRegionDisplayName",
      "dm_directoryParents.dm_directoryChildrenCount",

      // "dm_directoryParents.dm_directoryChildrenCount",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      // entityTypes: ["location"],
      savedFilterIds: ["1137990422"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

/**
 * Defines the path that the generated file will live at for production.
 *
 * NOTE: This currently has no impact on the local dev path. Local dev urls currently
 * take on the form: featureName/entityId
 */

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  var url = "";
  var name: any = document.name.toLowerCase();
  var string: any = name.toString();
  let result: any = string.replaceAll(" ", "-");
  // document.dm_directoryParents.map((result: any, i: Number) => {
  //   if (i > 0) {
  //     url += result.slug + "/"
  //   }
  // })
  if (!document.slug) {
    url += `${result}.html`;
  } else {
    url += `${document.slug.toString()}.html`;
  }

  return url;
  //   return document.id.toString() + ".html";
};
/**
 * Defines a list of paths which will redirect to the path created by getPath.
 *
 * NOTE: This currently has no impact on the local dev path. Redirects will be setup on
 * a new deploy.
 */
export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
  return [`index-old/${document.id.toString()}`];
};
/**
 * This allows the user to define a function which will take in their template
 * data and procude a HeadConfig object. When the site is generated, the HeadConfig
 * will be used to generate the inner contents of the HTML document's <head> tag.
 * This can include the title, meta tags, script tags, etc.
 */
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.name}connected kerb`,
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
              : `Find the ${document.name} connected kerb ${document.address.city}. connected kerb`
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: StaticData.Brandname,
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
          href: `${
            document._site.c_canonical ? document.c_canonical : stagingBaseurl
          }${
            document.slug ? document.slug : `${document.name.toLowerCase()}`
          }.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name}connected kerb ${document.address.city}. connected kerb products at competitive rates.`
          }`,
        },
      },
      {
        type: "link",
        attributes: {
          rel: "shortcut icon",
          href: favicon,
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
          property: "og:image",
          content: favicon,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:card",
          content: "summary",
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:title",
          content: document.c_meta_title
            ? document.c_meta_title
            : `${document.name} connected kerb`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description
              ? document.c_meta_description
              : `Find the ${document.name} connected kerb${document.address.city}. connected kerbcompetitive rates.`
          }`,
        },
      },
    ],
  };
};
type ExternalApiData = TemplateProps & { externalApiData: nearByLocation };
export const transformProps: TransformProps<ExternalApiData> = async (
  data: any
) => {
  var location = `${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.latitude
      : data.document.displayCoordinate.latitude
  },${
    data.document.yextDisplayCoordinate
      ? data.document.yextDisplayCoordinate.longitude
      : data.document.displayCoordinate.longitude
  }`;

  const url = `${AnswerExperienceConfig.endpoints.verticalSearch}?experienceKey=connected-search&api_key=6a1cb813428a1e4afb70a2d7acdba073&v=20220511&version=${AnswerExperienceConfig.experienceVersion}&locale=${AnswerExperienceConfig.locale}&location=${location}&locationRadius=${AnswerExperienceConfig.locationRadius}&verticalKey=locations&limit=4&retrieveFacets=true&skipSpellCheck=false&sessionTrackingEnabled=true&source=STANDARD`;
  // console.log(url);
  const externalApiData = (await fetch(url).then((res: any) =>
    res.json()
  )) as nearByLocation;

  return { ...data, externalApiData };
};

type ExternalApiRenderData = TemplateRenderProps & {
  externalApiData: nearByLocation;
};

const Location: Template<ExternalApiRenderData> = ({
  relativePrefixToRoot,
  path,
  document,
  __meta,
  externalApiData,
}) => {
  const {
    _site,
    name,
    address,
    mainPhone,
    hours,
    slug,
    timezone,
    additionalHoursText,
    c_canonical,
    photoGallery,
    yextDisplayCoordinate,
    displayCoordinate,
    cityCoordinate,
    /*mobile section*/
    c_mobileText,
    c_mobileHeading,
    c_mobileDescription,
    c_mobile,
    c_mobilePointImage,
    /** solution Card */
    c_solutionsTitle,
    c_card,
    c_solutionsCTA,
    /** Api Data */
    c_c_evses,

    /**Banner  */
    c_banners,
    c_bannerCtas,
    c_bannerheading,
    c_bannerpara,
    /**video section */
    c_videoTitles,
    c_videoDescription,
    c_kerbVideo,
    c_videoCTA,
    c_videoText,
    c_videoList,
    /** About section */

    c_aboutTitle,
    c_photo,
    description,
    c_learnMoreCTA,
    c_slide,
    /** Key Features */
    c_features,
    c_facility,
    /**Faq Section */
    c_faqText,
    c_faq,
    c_faqCTA,
    /**Near By section */
    c_nearbyText,
    /**dm page */
    dm_directoryParents,
  } = document;

  // console.log("35586", c_bannerheading);
  let templateData = { document: document, __meta: __meta };
  let hoursSchema = [];
  let breadcrumbScheme: any = [];
  for (var key in hours) {
    if (hours.hasOwnProperty(key)) {
      let openIntervalsSchema = "";
      if (key !== "holidayHours") {
        if (hours[key].isClosed) {
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: key,
          };
        } else {
          let end = "";
          let start = "";
          if (typeof hours[key].openIntervals != "undefined") {
            let openIntervals = hours[key].openIntervals;
            for (var o in openIntervals) {
              if (openIntervals.hasOwnProperty(o)) {
                end = openIntervals[o].end;
                start = openIntervals[o].start;
              }
            }
          }
          openIntervalsSchema = {
            "@type": "OpeningHoursSpecification",
            closes: end,
            dayOfWeek: key,
            opens: start,
          };
        }
      } else {
      }

      hoursSchema.push(openIntervalsSchema);
    }
  }
  document.dm_directoryParents &&
    document.dm_directoryParents.map((i: any, index: any) => {
      if (i.meta.entityType.id == "ce_country") {
        document.dm_directoryParents[index].name =
          document.dm_directoryParents[index].name;
        document.dm_directoryParents[index].slug =
          document.dm_directoryParents[index].slug;

        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
      // else if (i.meta.entityType.id == "ce_region") {
      //   let url = "";
      //   document.dm_directoryParents.map((j: any) => {
      //     if (
      //       j.meta.entityType.id != "ce_region" &&
      //       j.meta.entityType.id != "ce_city" &&
      //       j.meta.entityType.id != "ce_root"
      //     ) {
      //       // console.log(j, "j");
      //       url = url + j.slug;
      //     }
      //   });
      //   breadcrumbScheme.push({
      //     "@type": "ListItem",
      //     position: index,
      //     item: {
      //       "@id":
      //         stagingBaseurl +
      //         url +
      //         "/" +
      //         document.dm_directoryParents[index].slug +
      //         ".html",
      //       name: i.name,
      //     },
      //   });}
      else if (i.meta.entityType.id == "ce_city") {
        let url = "";
        document.dm_directoryParents.map((j: any) => {
          if (
            j.meta.entityType.id != "ce_city" &&
            j.meta.entityType.id != "ce_root"
          ) {
            // console.log(j, "j");
            url = url + "/" + j.slug;
          }
        });
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: index,
          item: {
            "@id":
              stagingBaseurl +
              url +
              "/" +
              document.dm_directoryParents[index].slug +
              ".html",
            name: i.name,
          },
        });
      }
    });

  breadcrumbScheme.push({
    "@type": "ListItem",
    position: 4,
    item: {
      "@id": stagingBaseurl + path,
      name: document.name,
    },
  });
  // console.log(document);
  let imageurl = photoGallery
    ? photoGallery?.map((element: any) => {
        return element.image.url;
      })
    : null;
  return (
    <>
      <JsonLd<Store>
        item={{
          "@context": "https://schema.org",
          "@type": "DepartmentStore",
          name: name,
          address: {
            "@type": "PostalAddress",
            streetAddress: address.line1,
            addressLocality: address.city,
            addressRegion: address.region,
            postalCode: address.postalCode,
            addressCountry: address.countryCode,
          },
          openingHoursSpecification: hoursSchema,
          description: description,
          image: imageurl,
          telephone: mainPhone,
          url: `${c_canonical ? c_canonical : stagingBaseurl}${
            slug ? slug : `${name}`
          }.html`,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: breadcrumbScheme,
        }}
      />

      <AnalyticsProvider
        templateData={templateData}
        enableDebugging={AnalyticsEnableDebugging}
        enableTrackingCookie={AnalyticsEnableTrackingCookie}
      >
        {" "}
        <AnalyticsScopeProvider name={""}>
          <PageLayout prop={_site} datas={undefined}>
            <Banner
              c_bannerheading={c_bannerheading}
              name={`${name}`}
              hours={hours}
              timezone={timezone}
              bannerpara={c_bannerpara}
              c_bannerCtas={c_bannerCtas}
              bannerImage={c_banners}
            />
            <BreadCrumbs
              name={name}
              parents={dm_directoryParents}
              baseUrl={relativePrefixToRoot}
              address={address}
            ></BreadCrumbs>

            <div className="location-information">
              <Contact
                address={address}
                c_features={c_features}
                phone={mainPhone}
                latitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.latitude
                    : displayCoordinate?.latitude
                }
                longitude={
                  yextDisplayCoordinate
                    ? yextDisplayCoordinate.longitude
                    : displayCoordinate?.longitude
                }
                hours={hours}
                additionalHoursText={additionalHoursText}
              ></Contact>
              {hours ? (
                <div className="map-sec" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                  />
                </div>
              ) : (
                <div className="map-sec without-hours" id="map_canvas">
                  <CustomMap
                    prop={
                      yextDisplayCoordinate
                        ? yextDisplayCoordinate
                        : displayCoordinate
                    }
                  />
                </div>
              )}
            </div>
            {/* {c_offerGallery ? (
            <div className="offerBanner">
              <div className="container">
                {c_offerGallery.map((offer: any) => {
                  return (
                    <>
                      <img src={offer.image.url} alt="offer" />
                    </>
                  );
                })}
              </div>
            </div>
          ) : (
            ""
          )} */}

            <div className="container-custom">
              {description && c_learnMoreCTA ? (
                <About
                  name={name}
                  c_photo={c_photo}
                  c_slide={c_slide}
                  description={description}
                  c_learnMoreCTA={c_learnMoreCTA}
                />
              ) : (
                ""
              )}

              {c_card ? (
                <Solutions c_para={c_solutionsTitle} c_card={c_card} />
              ) : (
                ""
              )}
            </div>

            {c_mobileHeading && c_mobile ? (
              <AddPromotion
                c_mobileHeading={c_mobileHeading}
                c_mobileDescription={c_mobileDescription}
                c_mobile={c_mobile}
                c_mobilePointImage={c_mobilePointImage}
              />
            ) : (
              ""
            )}

            {/* new Faq starts here */}
            <Faqs prop={c_faq} c_faqText={c_faqText} c_faqCTA={c_faqCTA} />

            {/* new faq ends here */}

            {c_kerbVideo ? (
              <Video
                c_kerbVideo={c_kerbVideo}
                c_videoTitle={c_videoTitles}
                c_videoList={c_videoList}
                c_videoText={c_videoText}
                c_videoDescription={c_videoDescription}
                c_videoCTA={c_videoCTA}
              />
            ) : (
              <></>
            )}

            {/* one remains open FAQ */}
            {/* <div className="faq-sec">
            {c_faq ? (
              <>
                <Faq
                  faqs={c_faq}
                  c_viewMoreFAQs={c_viewMoreFAQs}
                  c_fAQs={c_fAQs}
                  c_faqCTA={c_faqCTA}
                />
              </>
            ) : (
              <></>
            )}
          </div> */}
            {/*  */}

            <div className="nearby-sec">
              <div className="container">
                <div className="sec-title">
                  <h2 className="">{StaticData.NearStoretext}</h2>
                </div>
                {/* {console.log(externalApiData, "externalApiDataexternalApiData")} */}
                <div className="nearby-sec-inner">
                  {yextDisplayCoordinate ||
                  cityCoordinate ||
                  displayCoordinate ? (
                    <Nearby externalApiData={externalApiData} />
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <div className="view-more ">
                <a href="/" className="">
                  {" "}
                  {StaticData.AllLocationtext}
                </a>
              </div>
            </div>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Location;
