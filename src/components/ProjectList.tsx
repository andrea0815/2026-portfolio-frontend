import React, { useEffect, useState } from "react"
import { getProjects } from "../lib/graphqlClient";
import type { Project, ProjectVariables } from "../types/project"
import MediaAsset from "./atoms/MediaAsset";
import { MimeType } from "../types/MimeType";
import ProjectItem from "./ProjectItem";



export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        loadProjects();
    }, [])

    async function loadProjects() {
        const variables: ProjectVariables = {
            topic: ["design", "development"],
        }

        const projects = await getProjects(variables)

        setProjects(projects);
    }

    return (
        <div className="mx-5 my-8 w-[70%]">
            {projects.map((project) => (
                <React.Fragment key={project.id}>
                    <ProjectItem project={project} />
                   
                </ React.Fragment>
            ))
            }
        </div >
    )
}