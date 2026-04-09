// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import { RouterProvider } from "react-router-dom";
import { router } from "./app.routes";
import { AuthProvider } from "./features/auth/services/auth.context";
import { InterviewPropvider } from "./features/interview/interview.context";




function App() {

  return (
    <AuthProvider>
      <InterviewPropvider>
      <RouterProvider router={router} />
      </InterviewPropvider>
    </AuthProvider>
  )
}

export default App
