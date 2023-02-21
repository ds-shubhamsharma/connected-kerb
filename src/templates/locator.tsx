import * as React from "react";
import "../index.css";
import {
  GetHeadConfig,
  GetPath,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
} from "@yext/pages";
import { SearchHeadlessProvider } from "@yext/search-headless-react";
import {
  FilterSearch,
  VerticalResults,
  ResultsCount,
  AppliedFilters,
  ApplyFiltersButton,
  LocationBias,
  Pagination,
} from "@yext/search-ui-react";
import { Location } from "../types/search/locations";
import MapboxMap from "../components/MapboxMap";
import MapPin from "../components/MapPin";
import LocationCard from "../components/locatorPage/LocationCard";
import PageLayout from "../components/layouts/PageLayout";
import Geocode from "react-geocode";
import UseMyLocation from "../components/locatorPage/UseMyLocation";
import { Address } from "../types/search/locations";
import { useSearchActions } from "@yext/search-headless-react";
import { useEffect } from "react";
import SearchLayout from "../components/locatorPage/SearchLayout";
import {
  experienceKey,
  apiKey,
  verticalKey,
  stagingBaseurl,
  AnswerExperienceConfig,
  logo,
  AnalyticsEnableDebugging,
  AnalyticsEnableTrackingCookie,
  favicon,
} from "../../sites-global/global";
import { JsonLd } from "react-schemaorg";
import {
  AnalyticsProvider,
  AnalyticsScopeProvider,
} from "@yext/pages/components";
import { StaticData } from "../../sites-global/staticData";

// export const config: TemplateConfig = {
//   stream: {
//     $id: "locator",
//     filter: {
//       entityTypes: ["ce_locatorConnected"],
//     },
//     fields: [
//       "id",
//       "uid",
//       "meta",
//       "name",
//       "c_metaTags",
//       "c_ogMetaTags",
//       "c_twitter",
//       "c_text2",
//       "c_bookCta",
//       "c_message",
//       "c_bannerImages",
//     ],
//     localization: {
//       locales: ["en"],
//       primary: false,
//     },
//   },
// };

export const getPath: GetPath<TemplateProps> = () => {
  return `index.html`;
};
export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path, 
  document,
  __meta,
}): HeadConfig => {
  const { _site} = document;
  let templateData = { document: document, __meta: __meta };
  return {
    title:`${document.c_meta_title?document.c_meta_title:`Connected Kerb`}`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${document.c_meta_description?document.c_meta_description:`Connected Kerb item competitive rates.`}`,
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
         rel: "shortcut icon",
         href: favicon,
       },
     },
      {
        type: "link",
        attributes: {
          rel: "canonical",
          href: `${
            document._site.c_canonical?document.c_canonical:stagingBaseurl
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${document.c_meta_description?document.c_meta_description:`Connected Kerb.`}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.c_meta_title?document.c_meta_title:`Connected Kerb Find Connected Here.`}`,
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
         name: "twitter:description",
         content:`${document.c_meta_description?document.c_meta_description:`Connected Kerb`}`,
       },
     },
     {
       type: "meta",
       attributes: {
         name: "twitter:title",
         content: `${document.c_meta_title?document.c_meta_title:`Connected kerb`}`,
       },
     },
     {
       type: "meta",
       attributes: {
         name: "twitter:image",
         content: favicon
       },
     },
    ],
 };
};

const Locator: Template<TemplateRenderProps> = ({ document, __meta }) => {
  const { _site } = document;

  let templateData = { document: document, __meta: __meta };

  const endpoints = {
    universalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/query",
    verticalSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/query",
    questionSubmission:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/createQuestion",
    universalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/autocomplete",
    verticalAutocomplete:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/vertical/autocomplete",
    filterSearch:
      "https://liveapi-sandbox.yext.com/v2/accounts/me/answers/filtersearch",
  };
  var Api = "AIzaSyDZNQlSlEIkFAct5VzUtsP4dSbvOr2bE18";
  return (
    <>
      <JsonLd<locator>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Connected Kerb",
          url: stagingBaseurl,
          logo: favicon,
        }}
      />
      <JsonLd<BreadcrumbList>
        item={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",

          itemListElement: {
            "@type": "ListItem",
            position: 1,
            item: {
              "@id": "Home/Storelocator",
              name: "Home",
            },
          },
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
            <SearchHeadlessProvider
              experienceKey={experienceKey}
              locale={AnswerExperienceConfig.locale}
              apiKey={apiKey}
              verticalKey={verticalKey}
              experienceVersion="STAGING"
              sessionTrackingEnabled={true}
              endpoints={AnswerExperienceConfig.endpoints}
            >
              <SearchLayout _site={_site} />
            </SearchHeadlessProvider>
          </PageLayout>
        </AnalyticsScopeProvider>
      </AnalyticsProvider>
    </>
  );
};

export default Locator;
