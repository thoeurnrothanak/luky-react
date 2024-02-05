import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Menu, MenuItem } from '@material-ui/core';
import ErrorBoundary from '@component/ErrorBoundary';

const GADropdownMenu = ({ TriggerComponent, items, app }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const open = Boolean(anchorEl);

  useEffect(() => {
    setMenuItems(items);
  }, [items]);

  const openMenu = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (item, app, event) => {
    event.stopPropagation();

    if (item.onClick && typeof item.onClick === 'function') {
      item.onClick(app, event);
    }

    closeMenu();
  };

  return (
    <React.Fragment>
      <div className="pointer">
        <TriggerComponent.type {...TriggerComponent.props} onClick={openMenu} />
      </div>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={open}
        onClose={closeMenu}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}>
        {menuItems.map((item, index) => {
          return (
            <MenuItem
              key={index}
              disabled={item.disabled}
              onClick={(event) => handleMenuItemClick({ ...item }, { ...app }, event)}>
              {item.render && <ErrorBoundary>{item.render(app)}</ErrorBoundary>}
              {item.icon}
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </React.Fragment>
  );
};

GADropdownMenu.propTypes = {
  items: PropTypes.array.isRequired,
  TriggerComponent: PropTypes.element.isRequired,
};

export default GADropdownMenu;
