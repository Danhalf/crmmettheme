import {MutableRefObject, useEffect, useRef} from 'react'
import {ToggleComponent} from '../../../assets/ts/components'

type PropsType = {
  sidebarRef: MutableRefObject<HTMLDivElement | null>
}

const SidebarLogo = (props: PropsType) => {
  const toggleRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setTimeout(() => {
      const toggleObj = ToggleComponent.getInstance(toggleRef.current!) as ToggleComponent | null

      if (toggleObj === null) {
        return
      }

      toggleObj.on('kt.toggle.change', function () {
        props.sidebarRef.current!.classList.add('animating')

        setTimeout(function () {
          props.sidebarRef.current!.classList.remove('animating')
        }, 300)
      })
    }, 600)
  }, [toggleRef, props.sidebarRef])

  return <div className='app-sidebar-logo px-6' id='kt_app_sidebar_logo'></div>
}

export {SidebarLogo}
