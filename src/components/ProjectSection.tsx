import React, { useEffect, useState } from 'react';
import type { Project, ProjectVariables } from '../types/project';
import { getProject } from '../lib/graphqlClient';
import MediaAsset from './atoms/MediaAsset';
import type { MimeType } from '../types/MimeType';
import TagCategory from './atoms/TagCategory';
import TagTool from './atoms/TagTool';
import { formatDate } from '../utils/helpers';

function ProjectSection({ slug }: { slug: string }) {

  const [project, setProject] = useState<Project | null>(null);

  useEffect(() => {
    loadProjects();
  }, [])

  async function loadProjects() {
    console.log(slug);

    const variables: ProjectVariables = {
      slug: slug,
    }

    const project = await getProject(variables)

    console.log(project);

    setProject(project);
  }

  if (!project) {
    return <p data-vfx>loading …</p>
  }

  return (
    <div className='flex flex-col gap-6 my-[15dvh] w-full text-md'>



      <div className='flex justify-between items-baseline'>

        <h1 data-vfx className=" block font-mono">
          <span className='uppercase'> {project.title}</span>
          <span className=''>
            {project.subtitle ? ` / ${project.subtitle}` : null}
          </span>
        </h1>

        <div className='flex gap-3'>
          {project.githubLink?.url &&
            <a data-vfx href={project.githubLink?.url} target='_blank' className=' rounded-3xl border border-neutral-900  px-3 py-1 self-start'>=&gt; github</a>
          }

          {project.websiteLink?.url &&
            <a data-vfx href={project.websiteLink?.url} target='_blank' className='bg-neutral-900 text-white rounded-3xl px-3 py-1 self-start'>=&gt; website</a>
          }
        </div>
      </div>

      <div className='flex flex-col ml-6 gap-2 text-neutral-400'>
        <span data-vfx
        >/*</span>
        <p data-vfx>* finished: {formatDate(project.date)}</p>

        <div data-vfx className='flex justify-start gap-2 flex-wrap'>
          <p>* categories:</p>
          {project.categories.map((category, index) => (
            <React.Fragment key={index}>
              <TagCategory>
                {category.title.toLowerCase()}
              </TagCategory>
            </React.Fragment>
          ))}
        </div>

        <div data-vfx className='flex justify-start gap-2 flex-wrap'>
          <p>* tools:</p>
          {project.tools.map((tool, index) => (
            <React.Fragment key={index}>
              <TagTool>
                {tool.title.toLowerCase()}
              </TagTool>
            </React.Fragment>
          ))}
        </div>

        <span data-vfx
        >*/</span>
      </div>

      <MediaAsset type={project.thumbnail[0].mimeType as MimeType} url={project.thumbnail[0].url} dimensions={[project.thumbnail[0].width, project.thumbnail[0].height]} />

      <div
        data-vfx
        className='ml-8'
        dangerouslySetInnerHTML={{
          __html: project.description.html,
        }}
      />


      {project.gallery.map((mediaAsset, index) => (
        <React.Fragment key={index}>
          <MediaAsset type={mediaAsset.mimeType as MimeType} url={mediaAsset.url} dimensions={[mediaAsset.width, mediaAsset.height]} />
        </ React.Fragment>
      ))
      }
    </div>
  );
}

export default ProjectSection;
