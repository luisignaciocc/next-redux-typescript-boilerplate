import React from 'react'
import { MainLayout, MinimalLayout } from '../layouts'

type LayoutType = 'main' | 'minimal'

const WithLayout = (WrappedComponent: any, layout: LayoutType) => {
  return class extends React.Component {
    componentDidUpdate(_prevProps: any) {
      // console.log('Current props: ', this.props);
      // console.log('Previous props: ', prevProps);
    }

    render() {
      // Envuelve el componente de entrada en un contenedor, sin mutarlo. ¡Bien!
      return layout === 'main' ? (
        <MainLayout>
          <WrappedComponent {...this.props} />
        </MainLayout>
      ) : (
        <MinimalLayout>
          <WrappedComponent {...this.props} />
        </MinimalLayout>
      )
    }
  }
}

export default WithLayout
