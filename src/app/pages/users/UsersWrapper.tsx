/* eslint-disable jsx-a11y/anchor-is-valid */
import {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'

const UsersPage: FC = () => <></>

const UsersWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Users</PageTitle>
      <UsersPage />
    </>
  )
}

export {UsersWrapper}
