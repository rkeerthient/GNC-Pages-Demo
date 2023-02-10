/**
 * This is an example of how to create a template that makes use of streams data.
 * The stream data originates from Yext's Knowledge Graph. When a template in
 * concert with a stream is built by the Yext Sites system, a static html page
 * is generated for every corresponding (based on the filter) stream document.
 *
 * Another way to think about it is that a page will be generated using this
 * template for every eligible entity in your Knowledge Graph.
 */

import {
  GetHeadConfig,
  GetPath,
  GetRedirects,
  HeadConfig,
  Template,
  TemplateConfig,
  TemplateProps,
  TemplateRenderProps,
  TransformProps,
} from "@yext/pages";
import * as React from "react";
import { useState } from "react";
import PageLayout from "../components/page-layout";
import "../index.css";
import { Image } from "@yext/pages/components";
import StarRating from "../components/starRating";
import { AiOutlineCheck } from "react-icons/ai";
import { RxCross2 } from "react-icons/rx";
import ProductDetailSchema from "../Schemas/productDetailSchema";
import { Breadcrumbs } from "../components/Breadcrumbs";
import RTF from "../components/RTF";
import { transformSiteData } from "../utils/transformSiteData";
/**
 * Required when Knowledge Graph data is used for a template.
 */
export const config: TemplateConfig = {
  stream: {
    $id: "my-stream-id-2",
    // Specifies the exact data that each generated document will contain. This data is passed in
    // directly as props to the default exported function.
    fields: [
      "id",
      "uid",
      "meta",
      "slug",
      "landingPageUrl",
      "description",
      "name",
      "c_paymentOptions",
      "c_price",
      "c_rating",
      "c_reviewCount",
      "c_salePrice",
      "c_variants",
      "photoGallery",
      "c_parentCategory.name",
      "richTextDescription",
      "c_parentCategory.slug",
      "c_parentCategory.dm_directoryParents.name",
      "c_parentCategory.dm_directoryParents.slug",
      "c_parentCategory.dm_directoryChildren.name",
      "c_parentCategory.dm_directoryChildren.slug",
    ],
    // Defines the scope of entities that qualify for this stream.
    filter: {
      entityTypes: ["ce_product"],
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
  return document.slug ? document.slug : `${document.id.toString()}`;
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
    title: document.name,
    charset: "UTF-8",
    viewport: "width=device-width, initial-scale=1",
    tags: [
      {
        type: "meta",
        attributes: {
          name: "description",
          content: document.description,
        },
      },
    ],
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
 * The props passed in here are the direct stream document defined by `config`.
 *
 * There are a bunch of custom components being used from the src/components folder. These are
 * an example of how you could create your own. You can set up your folder structure for custom
 * components any way you'd like as long as it lives in the src folder (though you should not put
 * them in the src/templates folder as this is specific for true template files).
 */
const ProductDetail: Template<TemplateRenderProps> = ({
  relativePrefixToRoot,
  path,
  document,
}) => {
  const cpy = document;
  const {
    _site,
    landingPageUrl,
    description,
    name,
    c_parentCategory,
    c_paymentOptions,
    c_price,
    c_rating,
    c_reviewCount,
    c_salePrice,
    c_variants,
    photoGallery,
    richTextDescription,
  } = document;
  const [paymentOption, setPaymentOption] = useState(0);
  const [variants, setVariants] = useState(0);
  const breadcrumbs = c_parentCategory?.[0].dm_directoryParents
    ?.slice(1)
    .map((parent) => {
      return {
        name: parent.name,
        href: parent.slug,
        current: false,
      };
    });

  const x = c_parentCategory?.map(function (item: any) {
    return { name: item.name, href: item.slug, current: false };
  });
  breadcrumbs?.push(x[0]);

  return (
    <>
      <ProductDetailSchema document={cpy} />
      <PageLayout _site={_site}>
        {/* <div className="centered-container !max-w-screen-2xl"> */}
        <div className="mt-8 mb-4">
          <div className="bg-white">
            <div className="pt-6 pb-8">
              <div className="mx-auto mt-8  px-4 sm:px-6  lg:px-8">
                <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-3">
                  <div className="mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
                    <h2 className="sr-only">Images</h2>
                    <Breadcrumbs links={breadcrumbs} />
                    <div className="m-auto">
                      <Image image={photoGallery?.[0]}></Image>
                    </div>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8">
                    <div>
                      <h1 className="text-xl font-medium text-gray-900">
                        {name}
                      </h1>
                      {c_paymentOptions && (
                        <p className="text-xl font-medium text-gray-900">
                          ${c_paymentOptions?.[0].price}
                        </p>
                      )}
                    </div>
                    <div className="mt-4">
                      <div className="flex items-center">
                        <p className="text-xl text-gray-700">
                          <StarRating selectedStars={c_rating} />
                          <span className="ml-2">
                            {c_rating} ({c_reviewCount})
                          </span>
                        </p>
                        <div
                          aria-hidden="true"
                          className="ml-4 text-sm text-gray-300"
                        >
                          ·
                        </div>
                      </div>
                    </div>
                    {c_variants && (
                      <>
                        <div className="text-2xl font-bold mt-8">
                          CHOOSE FLAVOR
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-4">
                          {c_variants?.map((item: string, index: number) => (
                            <div
                              onClick={() => setVariants(index)}
                              key={index}
                              className={`hover:cursor-default flex justify-center items-center rounded-full border  px-4 py-2 text-sm text-center ${
                                index === variants
                                  ? "border-black"
                                  : "border-gray-300 "
                              }`}
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </>
                    )}
                    {c_paymentOptions && (
                      <>
                        <div className="text-2xl font-bold mt-8">
                          Buying options
                        </div>
                        <div className="mt-4 grid grid-cols-2 md:grid-cols-2 gap-4">
                          {c_paymentOptions?.map((item: any, index: number) => (
                            <span key={index}>
                              <div
                                onClick={() => setPaymentOption(index)}
                                className={`hover:cursor-default border px-4 pt-2 pb-8 text-sm text-center ${
                                  index === paymentOption
                                    ? "border-black"
                                    : "border-gray-300 "
                                }`}
                              >
                                <div className="flex flex-col gap-2">
                                  <div className="flex justify-center items-center  text-sm">
                                    {item.name}
                                  </div>
                                  <div
                                    className={`flex justify-center items-center font-bold ${
                                      index === 1 && "text-red-500"
                                    }`}
                                  >
                                    ${item.price}
                                  </div>
                                </div>
                              </div>
                            </span>
                          ))}
                        </div>
                        {paymentOption === 0 && (
                          <div className="mt-2 w-full">
                            <div className="flex flex-row gap-4">
                              <div className="w-1/4">
                                <select className="p-3 border w-full">
                                  <option value="fruit">1</option>
                                  <option value="vegetable">2</option>
                                  <option value="meat">3</option>
                                </select>
                              </div>
                              <div className="w-3/4 ">
                                <div className="bg-black text-white uppercase text-center p-3 ">
                                  {paymentOption === 0
                                    ? "Add to cart"
                                    : "Subscribe"}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        {paymentOption === 1 && (
                          <div className="mt-2 w-full">
                            <div className="grid grid-cols-3 text-sm">
                              <div className="border border-gray-200 text-center flex align-center justify-center p-4">
                                30 days
                              </div>
                              <div className="border border-gray-200 text-center flex align-center justify-center p-4">
                                45 days
                              </div>
                              <div className="border border-gray-200 text-center flex align-center justify-center p-4">
                                60 days
                              </div>
                              <div className="border border-gray-200 text-center flex align-center justify-center p-4">
                                90 days
                              </div>
                              <div className="border border-gray-200 text-center flex align-center justify-center p-4">
                                120 days
                              </div>
                            </div>
                            <div className="flex flex-row gap-4 mt-4">
                              <div className="w-1/4">
                                <select className="p-3 border w-full">
                                  <option value="fruit">1</option>
                                  <option value="vegetable">2</option>
                                  <option value="meat">3</option>
                                </select>
                              </div>
                              <div className="w-3/4 ">
                                <div className="bg-black text-white uppercase text-center p-3 ">
                                  Add to cart
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </>
                    )}
                    <div className="mt-4">
                      <div className="flex flex-row justify-between items-center">
                        <div className="w-auto text-lg font-bold">
                          EARN POINTS WITH THIS PURCHASE!
                        </div>
                        <div className="w-auto">
                          <div className="border border-black text-center flex align-center justify-center p-2">
                            LOG IN / SIGN UP
                          </div>
                        </div>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="w-full text-sm text-gray-500  text-center">
                      Note: This product cannot be shipped to Japan
                    </div>
                    <div className="mt-4 flex flex-col text-sm">
                      <div className="font-bold">Ship to Me</div>
                      <div className="flex mt-2">
                        <span className="text-green-500 flex justify-center items-center">
                          <AiOutlineCheck />
                          &nbsp; &nbsp; &nbsp; Available&nbsp;
                        </span>
                        <span>with Free Shipping $49+</span>
                      </div>
                    </div>
                    <hr className="my-4" />
                    <div className="mt-4 flex flex-col text-sm">
                      <div className="font-bold">Same Day Delivery to </div>
                      <div className="flex mt-2">
                        <span className="text-red-500 flex justify-center items-center">
                          <RxCross2 />
                          &nbsp; &nbsp; &nbsp; Not Available
                        </span>
                      </div>
                    </div>
                    <hr className="my-4" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
        <div className="centered-container !max-w-screen-lg">
          <div className="text-xl font-bold">Details</div>
          <div className="mt-4">
            <RTF>{richTextDescription}</RTF>
          </div>
        </div>
      </PageLayout>
    </>
  );
};

export default ProductDetail;
