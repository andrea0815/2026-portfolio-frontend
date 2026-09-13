import { useEffect, useState } from "react"
import { getProjects } from "../lib/graphqlClient";
import type { Project, ProjectVariables } from "../types/project"
import MediaAsset from "./MediaAsset";
import type { MimeType } from "../types/Mimetype";


export default function Projects() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        async function loadProjects() {
            const variables: ProjectVariables = {
                topic: ["design", "development"],
            }

            const projects = await getProjects(variables)

            setProjects(projects)
        }

        loadProjects();
    }, [])

    return (
        <div>
            {projects.map((project) => (
                <div key={project.id}>
                    <h2>{project.title}{project.subtitle ? ` – ${project.subtitle}` : null}</h2>
                    <p>{project.date}</p>
                    <MediaAsset type={project.thumbnail[0].mimeType as MimeType} url={project.thumbnail[0].url}/>
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