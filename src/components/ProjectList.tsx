import React, { useEffect, useState } from "react"
import { getProjects } from "../lib/graphqlClient";
import type { Project, ProjectsVariables } from "../types/project"
import ProjectItem from "./ProjectItem";
import VFXSection from "./VFXSection";



export default function ProjectList() {
    const [projects, setProjects] = useState<Project[]>([])

    useEffect(() => {
        loadProjects();
    }, [])

    async function loadProjects() {
        const variables: ProjectsVariables = {
            topic: ["design", "development"],
        }

        const projects = await getProjects(variables)

        setProjects(projects);
    }

    return (
        <VFXSection id="projects">
            {projects.map((project) => (
                <React.Fragment key={project.id}>
                    <ProjectItem project={project} />
                </ React.Fragment>
            ))
            }
        </VFXSection>
    )
}