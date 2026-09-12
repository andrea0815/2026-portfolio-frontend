import { useEffect, useState } from "react"

type Project = {
    title: string,
    id: string,
    description: string,
}

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
      description
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
                    <h2>{project.title}</h2>
                    <h2>{project.id}</h2>
                    <h2>{project.description}</h2>
                </div>
            ))}
        </div>
    )
}