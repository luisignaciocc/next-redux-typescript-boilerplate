import React from 'react';

type Props = {
  children: any;
};

const DefaultLayout = ({ children }: Props): React.ReactElement => {
  return <>{children}</>;
};

export default DefaultLayout;
