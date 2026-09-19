export type Image = {
    url: string,
    alt: string,
    copyright: string,
    mimeType: string,
    width: number,
    height: number,
}

export type Topic = {
    title: string
}
export type Category = {
    title: string
}
export type Tool = {
    title: string
}

export type ProjectVariables = {
    topic: String[];
}

export type Project = {
    id: string,
    title: string,
    slug: string,
    subtitle: string,
    description: { html: string },
    date: string,
    githubLink: string,
    websiteLink: string,
    furtherLink: string,
    thumbnail: Image[],
    gallery: Image[],
    categories: Category[],
    topics: Topic[],
    tools: Tool[],
}