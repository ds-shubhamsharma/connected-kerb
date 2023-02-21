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
import { StaticData } from "../../sites-global/staticData";
import PageLayout from "../components/layouts/PageLayout";
import { regionNames } from "../../sites-global/global";
import faviconA from "../images/faviconA.jpg";
import { JsonLd } from "react-schemaorg";
import { stagingBaseurl } from "../../sites-global/global";
import { Link } from "@yext/pages/components";

/**
 * Required when Knowledge Graph data is used for a template.
 */
var currentUrl = "";
export const config: TemplateConfig = {
  stream: {
    $id: "country",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "name",
      "address",
      "mainPhone",
      "slug",
      // "c_locatorBannerImage",
      // "c_locatorBannerTitle",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryParents.dm_directoryChildren",
      "dm_directoryParents.meta.entityType",
      "dm_directoryChildren.name",
      "dm_directoryChildren.address",
      "dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildrenCount",
      "dm_directoryChildren.dm_directoryChildren.slug",
      "dm_directoryChildren.dm_directoryChildren.id",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.name",
      "dm_directoryChildren.dm_directoryChildren.dm_directoryChildren.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_country"],
      savedFilterIds: ["dm_stores-directory_address_countrycode"],
    },
    // The entity language profiles that documents will be generated for.
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateProps> = ({ document }) => {
  currentUrl = "/" + document.slug.toString() + ".html";
  return "/" + document.slug.toString() + ".html";
};

// export const getRedirects: GetRedirects<TemplateProps> = ({ document }) => {
//   return [`index-old/${document.id.toString()}`];
// };

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}): HeadConfig => {
  return {
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
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
          name: "description",
          content: `${
            document.c_metaDescription
              ? document.c_metaDescription
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "title",
          content: `${document.c_metaTitle ? document.c_metaTitle : "gb"}`,
        },
      },
      {
        type: "meta",
        attributes: {
          name: "author",
          content: "Connected Kerb",
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
          href: `${stagingBaseurl}${document.slug}.html`,
        },
      },
      //og tags

      {
        type: "meta",
        attributes: {
          property: "og:url",
          content: `${stagingBaseurl}${document.slug}.html`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:description",
          content: `${
            document.c_ogDescription
              ? document.c_ogDescription
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:title",
          content: `${document.c_ogTitle ? document.c_ogTitle : document.name}`,
        },
      },
      {
        type: "meta",
        attributes: {
          property: "og:image",
          content: `${
            document.c_ogImage
              ? document.c_ogImage.map((result: any) => {
                  return result.url;
                })
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsJD7EAIslU6z-ABV1vv1dGXRRpNwpTIPGCcGFxwSnNKrm9VikOKnOh_z_WHCHB2D3j80&usqp=CAU"
          }`,
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
          name: "twitter:url",
          content: constant.stagingBaseurl,
        },
      },

      {
        type: "meta",
        attributes: {
          name: "twitter:description",
          content: `${
            document.c_ogDescription
              ? document.c_ogDescription
              : "Connected Kerb provide a unique approach to electric vehicle charging infrastructure – one that champions sustainability and connectivity."
          }`,
        },
      },
    ],
  };
};

const country: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const {
    name,
    // slug,
    _site,
    address,
    c_banner_image,
    c_bannerHeading,
    dm_directoryParents,
    dm_directoryChildren,
  } = document;

  // const childrenDivs = dm_directoryChildren
  //   ? dm_directoryChildren.map((entity: any) => {
  //       let detlslug;

  //       if (typeof entity.dm_directoryChildren != "undefined") {
  //         if (entity.dm_directoryChildrenCount == 1) {
  //           entity.dm_directoryChildren.map((res: any) => {
  //             res.dm_directoryChildren.map((detl: any) => {
  //             var name: any = detl.name.toLowerCase();
  //             var string: any = name.toString();
  //             let result: any = string.replaceAll(" ", "-");
  //             detlslug = result + ".html";
  //             // {console.log(detlslug,'detlslug')}
  //             })
  //           });
  //         } else {
  //           detlslug =  "gb/"+entity.slug.toLowerCase() + ".html";
  //         }
  //       }

  //       return (
  //         <li className=" storelocation-category">
  //           <Link key={entity.slug} href={detlslug} eventName={`details`}>
  //             {entity.name} ({entity.dm_directoryChildrenCount})
  //           </Link>
  //         </li>
  //       );
  //     })
  //   : null;
  var slug ="";
  const childrenDivs =
  dm_directoryChildren &&
  dm_directoryChildren?.map((entity: any) => {
    if (entity?.dm_directoryChildrenCount == 1) {
      entity.dm_directoryChildren?.map((i: any) => {
        i.dm_directoryChildren?.map((e: any) => {
          var name: any = e.name.toLowerCase();
          var string: any = name.toString();
          let result: any = string.replaceAll(" ", "-");
          slug = result + ".html";
        });
      });
      return (
        <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4">
          <a key={entity.slug} href={slug} className="hover:text-red">
            {entity.name} ({entity.dm_directoryChildrenCount})
          </a>
        </div>
      );
    } else {
      let slug = "/" + document.slug + "/" + entity.slug + ".html";
      return (
        <div className="w-1/2 storelocation-category md:w-1/3 lg:w-1/4 px-4 test">
          <a key={entity.slug} href={slug} className="hover:text-red">
            {entity.name} ({entity.dm_directoryChildrenCount})
          </a>
        </div>
      );
    }
  });
  let bannerimage = c_banner_image && c_banner_image.image.url;

  let breadcrumbScheme: any = [];
  dm_directoryParents &&
    dm_directoryParents.map((i: any, index: any) => {
      const slug = 10;
      if (slug == 10) {
        breadcrumbScheme.push({
          "@type": "ListItem",
          position: 1,
          item: {
            "@id": `${stagingBaseurl}${document.name
              .toLowerCase()
              .toString()}.html`,
            name: i.name,
          },
        });

        let url = "";
        let Name: any = document.name.toLowerCase().toString();
        Name = name.replace(/[&\/\\#^+()$~%.'":*?<>{}!@]/g, "");
        Name = Name.replaceAll("  ", "-");
        if (document.slug) {
          url = `${document.id}-${Name}.html`;
        } else {
          url = `${document.slug.toString()}.html`;
        }

        // breadcrumbScheme.push({
        //   "@type": "ListItem",
        //   position: 1,
        //   item: {
        //     "@id": `${stagingBaseurl}${url}`,
        //     name: document.name,
        //   },
        // });

        {
        }
      }
    });

  return (
    <>
      <JsonLd<Organization>
        item={{
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Connected Kerb",
          url: "",
          logo: "https://www.cenex.co.uk/app/uploads/2019/10/Picture3.png",
          address: {
            "@type": "PostalAddress",
            // streetAddress: "7 Davy Road",
            // addressLocality: "Clacton-on-Sea",
            // addressRegion: "New York",
            // postalCode: "",
            // addressCountry: "United States",
          },
          contactPoint: {
            "@type": "ContactPoint",
            contactType: "contact",
            telephone: "01255 222568",
          },
          sameAs: [
            "https://www.facebook.com/Connectedkerb",
            "https://www.instagram.com/Connectedkerb",
            "https://twitter.com/Connectedkerb",
          ],
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
        {/* <div className="location-dtl">
          <Banner
            name={c_bannerHeading ? c_bannerHeading : regionNames.of(name)}
            c_bannerImage={bannerimage}
            timezone={undefined}
          />
        </div> */}

        <BreadCrumbs
          name={regionNames.of(name)}
          address={address}
          parents={dm_directoryParents}
          baseUrl={relativePrefixToRoot}
        ></BreadCrumbs>

        <div className="content-list">
          <div className="container">
            <div className="sec-title">
              <h2 style={{ textAlign: "center" }}>
                {StaticData.AllCity} {regionNames.of(name)}{" "}
              </h2>
            </div>

            <ul className="region-list">{childrenDivs}</ul>
          </div>
        </div>
      </PageLayout>
    </>
  );
};
export default country;
