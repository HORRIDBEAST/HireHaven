"use client"
import React from 'react'
import { GlobalContextProvider } from '@/context/globalContext'
import {JobsContextProvider} from "@/context/jobsContext"
import { ReviewContextProvider } from '@/context/reviewContext'
interface Props {
    children: React.ReactNode
}
const ContextProvider = ({children}: Props) => {
  return (
    <GlobalContextProvider>
      <JobsContextProvider>
        <ReviewContextProvider>
      {children}
      </ReviewContextProvider>
      </JobsContextProvider>
    </GlobalContextProvider>
  )
}

export default ContextProvider
