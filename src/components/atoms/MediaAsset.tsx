import { useState } from "react";

type MediaAssetProps = {
    type: string;
    url: string;
    dimensions: [number, number];
};

function MediaAsset({
    type,
    url,
    dimensions,
}: MediaAssetProps) {
    const [isLoaded, setIsLoaded] = useState(false);
    const [videoDimensions, setVideoDimensions] =
        useState<[number, number] | null>(null);

    const isImage = type.startsWith("image/");
    const isVideo = type.startsWith("video/");

    const [imageWidth, imageHeight] = dimensions;

    const [width, height] = isVideo && videoDimensions
        ? videoDimensions
        : [imageWidth, imageHeight];

    const hasDimensions = width > 0 && height > 0;

    return (
        <div
            className="relative w-full overflow-hidden bg-neutral-200"
            style={{
                aspectRatio: hasDimensions
                    ? `${width} / ${height}`
                    : "16 / 9",
            }}
        >
            {!isLoaded && (
                <div className="absolute inset-0 animate-pulse bg-neutral-300" />
            )}

            {isImage && (
                <img
                    data-vfx
                    src={url}
                    alt=""
                    onLoad={() => setIsLoaded(true)}
                    className="absolute inset-0 block h-full w-full object-cover"
                />
            )}

            {isVideo && (
                <video
                    data-vfx
                    src={url}
                    crossOrigin="anonymous"
                    autoPlay
                    muted
                    loop
                    playsInline
                    onLoadedMetadata={(event) => {
                        const video = event.currentTarget;

                        setVideoDimensions([
                            video.videoWidth,
                            video.videoHeight,
                        ]);

                        setIsLoaded(true);
                    }}
                    className="absolute inset-0 block h-full w-full object-cover"
                />
            )}
        </div>
    );
}

export default MediaAsset;