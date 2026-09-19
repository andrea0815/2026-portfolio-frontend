// export const PROJECTS_QUERY = `
// query Projects($topic: [String]) {
//   entries(
//     section: "projects"
//     relatedToCategories: [{
//       group: ["topics"]
//       slug: $topic
//     }]
//     orderBy: "date DESC"
//   ) {
//     id
//     title
//     slug
//   }
// }

// `

export const PROJECTS_QUERY = `
query Projects($topic: [String]) {
  entries(
    section: "projects"
    relatedToCategories: [{
      group: ["topics"]
      slug: $topic
    }]
    orderBy: "date DESC"
  ) {
    id
    title
    slug

    ... on projectSection_Entry {
      subtitle
      date

      thumbnail {
        url
        alt
        mimeType
        width
        height
      }

      categories {
        title
        slug
      }
    }
  }
}
`;



export const PROJECTS_QUERY_FULL = `
query Projects($topic: [String]) {
  entries(
    section: "projects"
    relatedToCategories: [{
      group: ["topics"]
      slug: $topic
    }]
    orderBy: "date DESC"
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