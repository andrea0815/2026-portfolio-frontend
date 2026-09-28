import { MimeType } from "../types/MimeType";
import MediaAsset from "./atoms/MediaAsset";
import VFXSection from "./VFXSection";

function Intro({ children }: { children: any }) {
    return (
        <VFXSection>
            <div className='h-screen flex items-center'>
                <div className='w-full flex justify-between items-end '>

                    <div>
                        <h2 data-vfx className='text-lg text-neutral-400 inline'>
                            {children}
                        </h2>
                        <span data-vfx data-shader="blink" className='text-neutral-400 text-xl inline'>|</span>
                    </div>

                    <div className="w-1/3">
                        <MediaAsset type={MimeType.image} url="/images/portrait2.jpg" dimensions={[2651, 3977]} />
                    </div>
                </div>


            </div>
        </VFXSection>
    );
}

export default Intro;
