export const PROJECT_QUERY = `
query Project($slug: [String]) {
  entry(
    section: "projects"
    slug: $slug
  ) {
    id
    title
    slug

    ... on projectSection_Entry {
      subtitle

      description {
        html
      }

      date

      githubLink {
        url
      }

      websiteLink {
        url
      }

      furtherLink {
        label
        linkUrl {
          url
        }
      }

      thumbnail {
        url
        alt
        mimeType
        width
        height
      }

      gallery {
        url
        alt
        mimeType
        width
        height
      }

      topics {
        title
        slug
      }

      categories {
        title
        slug
      }

      tools {
        title
      }
    }
  }
}
`