/* eslint-disable react/jsx-no-target-blank */
import {SidebarMenuItem} from './SidebarMenuItem'

const SidebarMenuMain = () => {
  return (
    <>
      <SidebarMenuItem to='/users' icon='user' title='Users' fontIcon='bi-layers' />
      <SidebarMenuItem to='/reports' icon='book' title='Users reports' fontIcon='bi-layers' />
      <SidebarMenuItem to='/billing' icon='bill' title='Billing' fontIcon='bi-layers' />
    </>
  )
}

export {SidebarMenuMain}
