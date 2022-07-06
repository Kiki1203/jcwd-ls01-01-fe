import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SubMenu = ({ item }) => {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav(!subnav);

  return (
    <>
      <a className='sidebar-link'  href={item.path} onClick={item.subNav && showSubnav} style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
        <div>
          <div className='sidebar-icon-1'> {item.icons}</div>
          <div className='sidebar-label'>{item.title}</div>
        </div>
        <div className='sidebar-icon'>
          {item.subNav && subnav
            ? item.iconOpened
            : item.subNav
            ? item.iconClosed
            : null}
        </div>
      </a>
      
      {subnav &&
        item.subNav.map((item, index) => {
          return (
            <Link className='dropdown-link' to={item.path} key={index}  style={{ textDecoration:"none", color: "#213360", cursor: 'pointer' }}>
              {/* <div className='sidebar-icon'>{item.icons}</div> */}
              <div  className='sidebar-label-2'>{item.title}</div>
            </Link>
          );
        })}
    </>
  );
};

export default SubMenu;