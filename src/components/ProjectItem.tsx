import type { Project } from '../types/project';
import MediaAsset from './atoms/MediaAsset';
import type { MimeType } from '../types/MimeType';
import Tag from './atoms/Tag';

type Props = {
    project: Project
}

function ProjectItem({ project }: Props) {

    function formatDate(date: string): string {
        return new Date(date).toLocaleDateString("en-US", {
            month: "long",
            year: "numeric",
        })
    }

    return (
        <div key={project.id} className="mb-8 flex flex-col gap-5">
            <div className='flex gap-8 justify-between items-end'>
                <div className='flex flex-col gap-2'>
                    <h2 data-vfx className=" block font-mono text-lg">
                        {project.title}
                        <span className='text-lg text-gray-400'>
                            {project.subtitle ? ` | ${project.subtitle}` : null}
                        </span>
                    </h2>
                    {/* <p data-vfx className="font-mono text-sm tracking-wide">
                    {formatDate(project.date)}
                    </p> */}

                    <div data-vfx className='flex justify-start gap-2 flex-wrap'>
                        {project.categories.map((category, index) => (
                            <Tag key={index}>
                                {category.title}
                            </Tag>
                        ))}
                    </div>
                </div>
            </div>

            <a href={`/projects/${project.slug}`} className='cursor-pointer'>
                <MediaAsset type={project.thumbnail[0].mimeType as MimeType} url={project.thumbnail[0].url} dimensions={[project.thumbnail[0].width, project.thumbnail[0].height]} />
            </a>

            {/* <div
                dangerouslySetInnerHTML={{
                    __html: project.description?.html || "",
                }}
            /> */}

            {/* <p>
                        {project.tools.map((tool, index) => (
                            <span key={index}>
                                {tool.title}
                                {index < project.tools.length - 1 ? ", " : ""}
                            </span>
                        ))}
                    </p> */}
        </div>
    );
}

export default ProjectItem;
