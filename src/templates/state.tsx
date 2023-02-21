import * as React from "react";
import "../index.css";
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
import constant from "../constant";
import Banner from "../components/locationDetail/banner";
import PageLayout from "../components/layouts/PageLayout";
import { favicon, stagingBaseurl } from "../../sites-global/global";
import { StaticData } from "../../sites-global/staticData";
import Footer from "../components/layouts/footer";
import Header from "../components/layouts/header";

/**
 * Required when Knowledge Graph data is used for a template.
 */
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "region",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildrenCount",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.address",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_region"],
      savedFilterIds: ["dm_stores-directory_address_region"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

// export const getPath: GetPath<TemplateProps> = ({ document }) => {
//   let url = "";
//   document.dm_directoryParents.map((i: any) => {
//     if (i.meta.entityType.id == "ce_country") {
//       url += i.slug + "/";
//     }
//   });
//   url += document.slug.toString();

//   return url + ".html";
// };

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  if (document?.dm_directoryParents) {
    document?.dm_directoryParents?.map((i: any) => {
      currentUrl = i.slug;
      currentUrl = `${currentUrl}/${document.slug.toString()}`;
    });

    return currentUrl + ".html";
  } else {
    return `${document.slug.toString()}.html`;
  }
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  var canonical = "";
  document.dm_directoryParents.map((entity: any) => {
    canonical = entity.slug.toLowerCase();
  });

  return {
    title: document.c_meta_title
      ? document.c_meta_title
      : `${document.name}Royal Cafe Store`,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: `${
            document.c_meta_description ? document.c_meta_description : ""
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
            document.c_meta_description ? document.c_meta_description : ""
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
            : `${document.name} Royal Cafe Store`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_meta_description ? document.c_meta_description : ""
          }`,
        },
      },
    ],
  };
};

const region: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    _site,
    slug,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;
  const childrenDivs =
    dm_directoryChildren &&
    dm_directoryChildren?.map((entity: any) => {
      if (entity?.dm_directoryChildrenCount == 1) {
        // console.log(entity,"dhfgbjsdb")
        let slugs =
          "/" + entity?.dm_directoryChildren[0]?.name.toLowerCase() + ".html";
        let slug: any = slugs.replaceAll(" ", "-");
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
            <a key={entity.slug} href={slug} className="hover:text-red">
              {entity.name} ({entity.dm_directoryChildrenCount})
            </a>
          </div>
        );
      } else {
        // console.log(dm_directoryParents&&dm_directoryParents[1]&&dm_directoryParents[1].slug,'jghhfhhhjhhhhh')
        let slug =
          "/" +
          dm_directoryParents[1]?.slug +
          "/" +
          document.slug +
          "/" +
          entity.slug +
          ".html";
        return (
          <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4 test">
            <a key={entity.slug} href={slug} className="hover:text-red">
              {entity.name} ({entity.dm_directoryChildrenCount})
            </a>
          </div>
        );
      }
    });
  //     return (
  //       <li className=" storelocation-category">
  //         <a key={entity.slug} href={detlslug}>
  //           {entity.name} ({entity.dm_directoryChildrenCount})
  //         </a>
  //       </li>
  //     );
  //   })
  // : null;

  let bannerimage = c_banner_image && c_banner_image.image.url;
  return (
    <>
      <PageLayout prop={_site} datas={undefined}>
        <Banner name={name} timezone={undefined} />

        <BreadCrumbs
          name={name}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
          address={""}
        ></BreadCrumbs>
        <div className="content-list">
          <div className="container">
            <div className="sec-title">
              <h2 style={{ textAlign: "center" }}>{name}</h2>
            </div>
            <ul className="region-list">{childrenDivs}</ul>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default region;
