import React from 'react'
import Navbar from '../components/Navbar'
import { useFetchAdmin } from '../hooks/fetch'
import AdminView from '../components/AdminView';

const Admin = () => {
    const { admin, loading, error } = useFetchAdmin();
    return (
        (
            loading ? (<div>Loading...</div>) : (
                <div>
                    <Navbar isLoggedIn={true} userName={`${admin.first_name} ${admin.last_name}`} img={admin.avatar}/>

                    <AdminView/>

                </div>
            )
        )
    )
}

export default Admin
