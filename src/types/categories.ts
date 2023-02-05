export interface EntityReference {
	entityId: string,
	name: string,
}

export default interface Ce_category {
	landingPageUrl?: string,
	slug?: string,
	name: string,
	c_breadcrumbLevel1?: string,
	c_breadcrumbLevel2?: string,
	c_breadcrumbLevel3?: string,
	dm_directoryParents?: EntityReference[],
	id: string,
}
