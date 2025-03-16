import React from 'react'
import { Button } from '@/components/ui/button'
// import { Card } from '@/components/ui/card'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  import Link from 'next/link'
const LandingPage = () => {
    return (
        
            <section className="bg-gray-900 text-white">
               <div className="header px-10 py-6 flex justify-between items-center bg-gray-900">
               <Link
          href={"http://localhost:3001/"} >
        <h1 className="text-4xl font-bold text-white">HireHaven</h1></Link>
        
        <Link
          href={"http://localhost:3001/interview"}
          className="py-2 px-6 rounded-md border flex gap-4 bg-[#7263F3] text-white border-[#7263F3] hover:bg-[#7263F3]/90 transition-all duration-200 ease-in-out"
        >
          Start
        </Link>
      </div>
              {/* Hero Section */}
              <div className="mx-auto max-w-screen-xl px-4 pt-16 pb-32 lg:flex lg:h-screen lg:items-center">
  {/* Left Side (40%) - Text Content */}
  <div className="w-full lg:w-9/20 text-left">
    {/* Gradient Heading */}
    <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl">
      Ace Your Next Interview.
      <span className="sm:block"> Get Real-Time Feedback. </span>
    </h1>

    {/* Subheading */}
    <p className="mt-4 sm:text-xl/relaxed">
      Prepare for specific job roles, assess your performance, and receive actionable feedback to improve your interview skills.
    </p>

    {/* Buttons */}
    <div className="mt-8 flex flex-wrap gap-4">
      <a
        className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
        href="http://localhost:3001/interview"
      >
        Start Your Interview
      </a>

      <a
        className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
        href="#"
      >
        Learn More
      </a>
    </div>
  </div>

  {/* Right Side (60%) - Image */}
  <div className="w-full lg:w-11/20 mt-8 lg:mt-0 lg:pl-8">
  <div className="w-[600px] h-[600px] rounded-[60px] overflow-hidden border-8 border-blue-900 shadow-2xl">
      <img
        src="/goated.jpg" // Path to your image in the public folder
        alt="Interview Preparation"
        className="w-full h-full object-cover"
      />
    </div>
  </div>
</div>
        
<section className="bg-gray-700 py-16">
        <div className="mx-auto max-w-screen-xl px-2 sm:px-6 lg:px-8 h-[350px]">
          <div className="grid grid-cols-1 md:grid-cols-2 md:items-center gap-8 h-full">
            {/* Left Side (40%) - Image */}
            <div className="flex items-center justify-center">
              <img
                src="/newgot.jpg" // Path to your image in the public folder
                alt="Project Health Tracker"
                className="h-[300px] w-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Right Side (60%) - Text Content */}
            <div className="flex flex-col justify-center">
              <h2 className="text-2xl font-semibold text-white sm:text-3xl">
                How Can You Be Confident Your Project Will Stay on Track?
              </h2>

              <p className="mt-4 text-gray-300">
                The PulseSync Project Health Tracker was created to help project managers and team leads monitor project health in real-time and prevent delays. This free resource includes step-by-step guidance on assessing team progress, identifying bottlenecks, and keeping projects moving forward—all with minimal stress.
              </p>
            </div>
          </div>
        </div>
      </section>

              {/* Features Section */}
              <section className="py-12 bg-gray-800">
                <div className="max-w-6xl mx-auto px-4">
                  <h2 className="text-3xl font-bold text-center text-lavender">
                    Exclusive Features! At single destination
                  </h2>
                  <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 lg:grid-cols-3">
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}} className='font-bold text-2xl'>Role-Specific Practice</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Choose from a wide range of job roles and practice tailored questions to simulate real interviews.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}} className='font-bold text-xl'>Performance Metrics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Get detailed analytics on your strengths and weaknesses with metrics like time taken, clarity, and more.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}} className='font-bold text-xl'>Expert Feedback</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Receive actionable insights and feedback to improve your interview responses effectively.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}} className='font-bold text-xl'>Mock Interview Scheduler</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Schedule mock interviews with experts to practice in real-time and boost your confidence.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}}  className='font-bold text-xl'>Progress Tracking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Monitor your improvement over time with easy-to-read progress reports.
                        </CardDescription>
                      </CardContent>
                    </Card>
                    <Card className='bg-gray-500'>
                      <CardHeader>
                        <CardTitle style={{color:"#FFF1E6"}} className='font-bold text-xl'>Customizable Templates</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className='text-lg text-center' style={{color:"#E7DECC"}}>
                          Prepare concise and impactful answers using customizable templates designed by experts.
                        </CardDescription>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>
        
              {/* Call to Action Section */}
              <div className="bg-gray-900 py-16">
                <div className="mx-auto max-w-screen-xl px-4 text-center">
                  <h2 className="text-3xl font-bold text-white mb-8">
                    Ready to Ace Your Interview?
                  </h2>
                  <a
                    className="inline-block rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75"
                    href="http://localhost:3001/interview"
                  >
                    Get Started Now
                  </a>
                </div>
              </div>
            </section>
          );
      
}

export default LandingPage
