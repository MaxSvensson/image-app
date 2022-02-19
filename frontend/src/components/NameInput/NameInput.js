import React from 'react';

const NameInput = ({ value, onChange }) => {
    return <input required id="name-input" value={value} onChange={(e) => onChange(e.target.value, "name")} placeholder="Namn på bild" />
}

export default NameInput;