import React from 'react';

const ImageInput = ({ onChange }) => {
    return <input required id="image-input" onChange={(e) => onChange(e.target.files[0], "photo")} type="file" />
}

export default ImageInput;