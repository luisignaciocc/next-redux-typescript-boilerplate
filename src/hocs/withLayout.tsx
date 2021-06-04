import React from 'react';
import { MainLayout, MinimalLayout, DefaultLayout } from 'src/layouts/';

type LayoutType = 'main' | 'minimal' | 'default';

const WithLayout = (WrappedComponent: any, layout: LayoutType) => {
  return class extends React.Component {
    componentDidUpdate(_prevProps: any) {
      // console.log('Current props: ', this.props);
      // console.log('Previous props: ', prevProps);
    }

    render() {
      switch (layout) {
        case 'main':
          return (
            <MainLayout>
              <WrappedComponent {...this.props} />
            </MainLayout>
          );
        case 'minimal':
          return (
            <MinimalLayout>
              <WrappedComponent {...this.props} />
            </MinimalLayout>
          );
        default:
          return (
            <DefaultLayout>
              <WrappedComponent {...this.props} />
            </DefaultLayout>
          );
      }
    }
  };
};

export default WithLayout;
