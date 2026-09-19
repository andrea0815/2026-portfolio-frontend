import { useParams } from "react-router";

export default function ProjectPage() {
    const { slug } = useParams();

    if (!slug) {
        return null;
    }

    return (
        <main>

            Project
        </main>
    );
}
