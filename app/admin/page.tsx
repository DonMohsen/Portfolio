"use client"
import React from 'react'
import ReactQueryProvider from '../providers/react-query-provider'
import AdminAllCards from '@/components/Admin/AdminAllCards'
import ProjectForm from '@/components/Forms/project-form'
import useProjectForm from '@/store/useProjectForm'

const AdminPage = () => {
    const {isOpen,setFormState,toggleForm}=useProjectForm()

  return (

    <div>
        {
            isOpen===true&&
        <ProjectForm/>
        }
        <ReactQueryProvider>
            <AdminAllCards/>
        </ReactQueryProvider>
    </div>
  )
}

export default AdminPage