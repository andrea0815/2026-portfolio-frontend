import { MimeType } from '../types/Mimetype';

type MediaAssetType = {
    type: MimeType,
    url: string
}

function MediaAsset({
    type,
    url
}: MediaAssetType) {

    if (type === MimeType.image || type === MimeType.gif)
        return (
            <img src={url} />
        );

    if (type === MimeType.video) {
        return (
            <video src={url} autoPlay loop muted/>
        )
    } else {
        <p>Media could not be displayed</p>
    }
}

export default MediaAsset;
