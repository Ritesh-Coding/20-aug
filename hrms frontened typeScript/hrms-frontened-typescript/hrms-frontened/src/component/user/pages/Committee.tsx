import React from 'react'
import { navbarTitle } from '../../../reducers/authReducer';
import { useDispatch } from 'react-redux'
const Committee : React.FC= () => {
  const dispatch = useDispatch()
  dispatch(
    navbarTitle({
        navTitle: "Committee"}));
  return (
    <div>Committee</div>
  )
}

export default Committee