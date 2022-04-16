import React, { useState } from "react";

function InputForm(props) {
  const [hover, setHover] = useState(false);

  function toggleClass(el) {
    if(el.target.value) return setHover(true)
  
    setHover(!hover);
  }
  return (
    <div className="container__input">
      <label className='label' style={hover ? {color: '#0EA5E9'} :{color: '#0EA5E9'}}>{props.name}</label>
      <input
        className="input"
        value={props.value}
        onChange={(el) => props.change(el.target.value)}
        type={props.type}
        placeholder={undefined}
        onFocus={(el) => toggleClass(el)}
        onBlur={(el) => toggleClass(el)}
        required
        //onMouseLeave={setHover(false)}
      />
    </div>
  );
}

export default InputForm;
