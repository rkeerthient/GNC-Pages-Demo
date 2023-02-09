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

export default interface Ce_article {
	body?: string,
	datePosted?: string,
	landingPageUrl?: string,
	name: string,
	c_articleCategory?: string,
	c_articlePhoto?: Image,
	c_author?: string,
	c_authorImage?: Image,
	c_authorInfo?: string,
	id: string,
}
