import { useParams } from "react-router";
import ProjectSection from "../components/ProjectSection";
import VFXSection from "../components/VFXSection";

export default function ProjectPage() {
    const { slug } = useParams();

    if (!slug) {
        return null;
    }



    return (
        <VFXSection>
            <ProjectSection slug={slug} />
        </VFXSection>
    );
}
