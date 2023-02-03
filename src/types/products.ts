export interface EntityReference {
	entityId: string,
	name: string,
}

export interface C_paymentOptions {
	name?: string,
	price?: number,
}

export interface ImageThumbnail {
	url: string,
	width: number,
	height: number,
}

export interface Image {
	url: string,
	width: number,
	height: number,
	thumbnails?: ImageThumbnail[],
	alternateText?: string,
}

export interface ComplexImage {
	image: Image,
	details?: string,
	description?: string,
	clickthroughUrl?: string,
}

export default interface Ce_product {
	landingPageUrl?: string,
	slug?: string,
	description?: string,
	name: string,
	c_parentCategory?: EntityReference[],
	c_paymentOptions?: C_paymentOptions[],
	c_price?: number,
	c_rating?: number,
	c_reviewCount?: number,
	c_salePrice?: number,
	c_variants?: string[],
	photoGallery?: ComplexImage[],
	id: string,
}
