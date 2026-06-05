"use client"
import React from 'react'
import ReactQueryProvider from '../providers/react-query-provider'
import AdminAllCards from '@/components/Admin/AdminAllCards'

const AdminPage = () => {

  return (
    <ReactQueryProvider>

    <div>
        
       
            <AdminAllCards/>
    
    </div>
        </ReactQueryProvider>
  )
}

export default AdminPage