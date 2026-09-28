import { PROJECTS_QUERY } from "../graphql/queries/projects"
import { PROJECT_QUERY } from "../graphql/queries/project"
import type { Project, ProjectsVariables } from "../types/project"

const API_URL = "https://dashboard.andreawindisch.com/actions/graphql/api"
const API_TOKEN = import.meta.env.VITE_CRAFT_GRAPHQL_TOKEN

export async function getProjects(variables: ProjectsVariables): Promise<Project[]> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
            query: PROJECTS_QUERY,
            variables: variables,
        }),
    })

    const result = await response.json()

    return result.data.entries as Project[]
}

export async function getProject(variables: { slug: String }): Promise<Project> {
    const response = await fetch(API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${API_TOKEN}`,
        },
        body: JSON.stringify({
            query: PROJECT_QUERY,
            variables: variables,
        }),
    })

    const result = await response.json()    

    return result.data.entry as Project
}