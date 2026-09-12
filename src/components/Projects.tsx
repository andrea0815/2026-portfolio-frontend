import { useEffect, useState } from "react"
import type { Project } from "../types/general"

export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        async function loadProjects() {
            const response = await fetch(
                "https://dashboard.andreawindisch.com/actions/graphql/api",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${import.meta.env.VITE_CRAFT_GRAPHQL_TOKEN}`,
                    },
                    body: JSON.stringify({
                        query: `
            {
  entries(section: "projects") {
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
        width
        height
      }
      gallery {
        url
        width
        height
      }
      categories {
        title
      }
      tools {
        title
      }
      
    }
  }
}
            `,
                    }),
                }
            )

            const result = await response.json()

            console.log(result)

            setProjects(result.data.entries)
        }

        loadProjects()
    }, [])

    return (
        <div>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.title}{project.subtitle ? ` – ${project.subtitle}` : null}</h2>
                    <p>{project.date}</p>
                    <img src={project.thumbnail[0].url} alt={project.thumbnail[0].alt} />

                    <div
                        dangerouslySetInnerHTML={{
                            __html: project.description?.html || "",
                        }}
                    />
                    <p>
                        {project.categories.map((category, index) => (
                            <span key={index}>
                                {category.title}
                                {index < project.categories.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>
                    <p>
                        {project.tools.map((tool, index) => (
                            <span key={index}>
                                {tool.title}
                                {index < project.tools.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p>
                </div>
            ))}
        </div>
    )
}