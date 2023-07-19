import {useLayout} from '../../core'

const FooterWrapper = () => {
  const {config} = useLayout()
  if (!config.app?.footer?.display) {
    return null
  }

  return <div className='app-footer' id='kt_app_footer'></div>
}

export {FooterWrapper}
