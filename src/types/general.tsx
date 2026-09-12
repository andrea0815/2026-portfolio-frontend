export type Image = {
    url: string,
    alt: string,
    copyright: string,
    width: Number,
    height: Number,
}

export type Category = {
    title: string
}
export type Tool = {
    title: string
}

export type Project = {
    id: string,
    title: string,
    slug: string,
    subtitle: string,
    description: { html: string},
    date: string,
    githubLink: string,
    websiteLink: string,
    furtherLink: string,
    thumbnail: Image[],
    gallery: Image[],
    categories: Category[],
    tools: Tool[],
}