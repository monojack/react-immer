import { useState, useEffect, } from 'react'
import useImmerHook from './useImmerHook'
import useImmerRenderer from './useImmerRenderer'

const useImmer = useState && useEffect ? useImmerHook : useImmerRenderer

export default useImmer
