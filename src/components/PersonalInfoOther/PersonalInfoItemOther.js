/* eslint-disable jsx-a11y/alt-text */
import React, {useState} from 'react'
import './index.css'
import { useSelector } from 'react-redux';

const PersonalInfoItemOther = ({profileData, info, edit, setProfile}) => {
    const profile = profileData
    const key = (info.columnName.charAt(0).toLowerCase() + info.columnName.slice(1)).split(' ').join('')
    const [value, setValue] = useState(profile[key])
    let updatedValue = {}
    const [privateI, setPrivateI] = useState("[HIDDEN] Private Information")

  const handleChange = (e) => {
    updatedValue = { [key]: e.target.value };
    setValue(e.target.value);
    setProfile((profile) => ({ ...profile, ...updatedValue }));
  };

  return (
    <div className={`row sidebar-item p-3 ms-2 me-2`}>
      <div className={`col-2 d-flex align-items-center`}>
        <img
          className={`rounded-circle`}
          src={`/images/icons/${info.image}`}
          width={`30px`}
          height={`30px`}
        />

      </div>
      {(info.columnName==="Age") ?
        <>
          <div className={`col-5 d-flex align-items-center`}>
            <h4>{info.columnName} :</h4>
          </div>
          <div className={`col fw-bold d-flex align-items-center ps-0`}>
            {privateI}
          </div>
        </>
      
    :
    <>
          <div className={`col-5 d-flex align-items-center`}>
        <h4>{info.columnName} :</h4>
      </div>
      <div className={`col fw-bold d-flex align-items-center ps-0`}>
        {profile[key]}

        {info.unit}
      </div>
        </>
    }

    </div>
  );
};

export default PersonalInfoItemOther;
