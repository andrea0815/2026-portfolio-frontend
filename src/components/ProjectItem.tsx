import type { Project } from '../types/project';
import MediaAsset from './atoms/MediaAsset';
import type { MimeType } from '../types/MimeType';
import TagCategory from './atoms/TagCategory';
import { formatDate } from '../utils/helpers';

type Props = {
    project: Project
}

function ProjectItem({ project }: Props) {

    return (
        <div key={project.id} className="mb-8 flex flex-col gap-5">
            <div className='flex gap-8 justify-between items-end'>
                <div className='flex flex-col gap-2 w-full'>
                    <div className='flex justify-between w-full'>

                        <h2 data-vfx className=" block font-mono text-lg">
                            <span className='uppercase'>
                                {project.title}
                            </span>
                            {project.subtitle ? ` / ${project.subtitle}` : null}
                        </h2>

                        <p data-vfx className='text-lg'>
                            {formatDate(project.date)}
                        </p>
                    </div>

                    <div data-vfx className='flex justify-start gap-2 flex-wrap'>
                        <span className='text-neutral-400'> /*</span>
                        {project.categories.map((category, index) => (
                            <TagCategory key={index}>
                                {category.title.toLowerCase()}
                            </TagCategory>
                        ))}
                        <span className='text-neutral-400'>*/</span>
                    </div>
                </div>
            </div>

            <a href={`/projects/${project.slug}`} className='cursor-pointer'>
                <MediaAsset type={project.thumbnail[0].mimeType as MimeType} url={project.thumbnail[0].url} dimensions={[project.thumbnail[0].width, project.thumbnail[0].height]} />
            </a>
        </div>
    );
}

export default ProjectItem;
