import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../store/GlobalState';
import AdminPanel from '../components/AdminPanel'
const { state } = useContext(DataContext);
const { auth } = state;


const Admin = () => {
    if (auth.user && auth.user.role === 'admin') {
        return <AdminPanel />;
}else{
   return <h1>Not authorized!</h1>
}
}

export default Admin