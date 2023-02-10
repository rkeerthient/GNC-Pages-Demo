import * as React from "react";
import "../index.css";
import {
  Template,
  GetPath,
  TemplateRenderProps,
  GetHeadConfig,
  HeadConfig,
  TransformProps,
  TemplateConfig,
} from "@yext/pages";
import PageLayout from "../components/page-layout";
import { transformSiteData } from "../utils/transformSiteData";
import { Image } from "@yext/pages/components";

export const config: TemplateConfig = {
  stream: {
    $id: "home_page",
    fields: [
      "id",
      "slug",
      "name",
      "c_featuredCategories.name",
      "c_featuredCategories.slug",
      "c_features.title",
      "c_features.subtitle",
      "c_features.image",
    ],
    filter: {
      entityTypes: ["ce_page"],
    },
    localization: {
      locales: ["en"],
      primary: false,
    },
  },
};

export const getPath: GetPath<TemplateRenderProps> = ({ document }) => {
  return document.slug ?? document.name;
};

export const getHeadConfig: GetHeadConfig<
  TemplateRenderProps
> = (): HeadConfig => {
  return {
    title: "GNC",
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
  };
};

// TODO: update typing
export const transformProps: TransformProps<TemplateRenderProps> = async (
  data
) => {
  const { _site } = data.document;

  return {
    ...data,
    document: {
      ...data.document,
      _site: transformSiteData(_site),
    },
  };
};

/**
 * This is the main template. It can have any name as long as it's the default export.
 * The props passed in here are the direct result from `getStaticProps`.
 */
const Home: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site, c_featuredCategories, c_features } = document;

  return (
    <>
      <PageLayout _site={_site}>
        {/* if c_features exists, display them in a 4 column grid. Each feature has a title, subtitle, and image. The image is of type Image and should be used with an Image component*/}
        {c_features && (
          <div className="grid grid-cols-4 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {c_features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col  px-4 py-4 m-4 border-[#1a1a1a] items-center text-[#1a1a1a] max-w-sm"
              >
                {feature.image && (
                  <div className="w-60">
                    <Image image={feature.image} />
                  </div>
                )}
                <h3 className="text-2xl font-bold">{feature.title}</h3>
                <p className="text-start mt-2">{feature.subtitle}</p>
              </div>
            ))}
          </div>
        )}
        <h2 className="text-2xl font-bold">Featured Categories</h2>
        {c_featuredCategories && (
          <div className="grid grid-cols-2 gap-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {c_featuredCategories.map((category) => (
              <a
                key={category.slug}
                href={category.slug}
                className="text-xl text-center"
              >
                <div className="hover:cursor-pointer flex flex-col justify-between px-4 py-4 border-2 m-4 border-[#1a1a1a] items-center hover:bg-[#1a1a1a] hover:text-white text-[#1a1a1a] max-w-sm">
                  {category.name}
                </div>
              </a>
            ))}
          </div>
        )}
      </PageLayout>
    </>
  );
};

export default Home;
