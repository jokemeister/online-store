import React from 'react';
import { useLocation } from 'react-router-dom';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import './BreadCrumbs.css';
import { translate } from '../translate/translate';

export const Breadcrumbs = () => {
  const breadcrumbs = useBreadcrumbs();
  const location = useLocation();

  return (
    <div className="container">
      <Breadcrumb>
        {breadcrumbs.map(({ breadcrumb }) =>
          <Breadcrumb.Item key={breadcrumb.key} href={process.env.PUBLIC_URL+`/#${breadcrumb.key}`} active={breadcrumb.key === location.pathname}>
            { translate(breadcrumb.props.children.toLowerCase()) }
          </Breadcrumb.Item >
        )}
      </Breadcrumb>
    </div>
  );
};