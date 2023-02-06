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
import { SearchResults } from "../components/search/SearchResults";
import { FieldValueStaticFilter, Matcher } from "@yext/search-headless-react";

export const config: TemplateConfig = {
  stream: {
    $id: "category-pages",
    fields: [
      "id",
      // "entityType",
      "name",
      "slug",
      "dm_directoryParents.name",
      "dm_directoryParents.slug",
      "dm_directoryChildren.name",
      "dm_directoryChildren.slug",
    ],
    filter: {
      entityTypes: ["ce_category", "ce_categoryLevel2", "ce_categoryLevel1"],
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

export const getHeadConfig: GetHeadConfig<TemplateRenderProps> = ({
  document,
}): HeadConfig => {
  return {
    title: `GNC | ${document.name}`,
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
const CategoryResults: Template<TemplateRenderProps> = ({
  document,
}: TemplateRenderProps) => {
  const { _site, meta, name } = document;
  const entityType = meta.entityType.id;

  console.log("data", document);
  console.log("entityType", entityType);

  const initialFilter: FieldValueStaticFilter = {
    kind: "fieldValue",
    fieldId:
      entityType === "ce_category"
        ? "c_parentCategory.name"
        : "c_parentCategory.dm_directoryParents.name",
    matcher: Matcher.Equals,
    value: name,
  };

  return (
    <>
      <PageLayout _site={_site}>
        <SearchResults
          initialFilter={initialFilter}
          initialVerticalKey={"products"}
          categoryName={name}
        />
      </PageLayout>
    </>
  );
};

export default CategoryResults;
