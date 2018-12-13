import React from 'react'
import Immer from './Immer'

export default function useImmerRenderer (spec, render) {
  return <Immer spec={spec}>{render}</Immer>
}
