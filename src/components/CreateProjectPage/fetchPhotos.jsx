import { Cloudinary as CoreCloudinary, Util } from 'cloudinary-core';

export const url = (publicId, options) => {
    const scOptions = Util.withSnakeCaseKeys(options);
    const cl = CoreCloudinary.new();
    return cl.url(publicId, scOptions);
};


export async function  fetchPhotos  (imageTag, setter)  {
    const options = {
        cloudName: 'dayger666',
        format: 'json',
        type: 'list',
        version: Math.ceil(new Date().getTime() / 1000),
    };

    const urlPath = url(imageTag.toString(), options);

    fetch(urlPath)
        .then(res => res.text())
        .then(text => (text ? setter(JSON.parse(text).resources.map(image => image.public_id)) : []))
        .catch(err => console.log(err));
};