"use client"
import React from 'react'
import ReactQueryProvider from '../providers/react-query-provider'
import AdminAllCards from '@/components/Admin/AdminAllCards'
import ProjectForm from '@/components/Modals/project-form'
import useProjectForm from '@/store/useProjectForm'
import { AnimatePresence } from 'framer-motion'

const AdminPage = () => {
    const {isOpen,setFormState,toggleForm}=useProjectForm()

  return (
    <ReactQueryProvider>

    <div>
        
        {/* {
          isOpen===true&&
          <ProjectForm type='post'   />
        } */}
            <AdminAllCards/>
    
    </div>
        </ReactQueryProvider>
  )
}

export default AdminPage