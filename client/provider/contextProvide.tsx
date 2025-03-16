"use client"
import React from 'react'
import { GlobalContextProvider } from '@/context/globalContext'
import {JobsContextProvider} from "@/context/jobsContext"
import { ReviewContextProvider } from '@/context/reviewContext'
import { InterviewContextProvider } from '@/context/interviewContext'
interface Props {
    children: React.ReactNode
}
const ContextProvider = ({children}: Props) => {
  return (
    <GlobalContextProvider>
      <JobsContextProvider>
        <ReviewContextProvider>
          <InterviewContextProvider>
      {children}
      </InterviewContextProvider>
      </ReviewContextProvider>
      </JobsContextProvider>
    </GlobalContextProvider>
  )
}

export default ContextProvider
