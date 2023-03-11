import HeaderText from '../components/HeaderText';

import Head from 'next/head';
import Link from 'next/link'
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import Timer from '../components/Timer'
import Modal from '../components/ModalResult'
import { DataContext } from '../store/GlobalState';
const { state } = useContext(DataContext);
const { auth } = state;


const admin = () => {
    if (auth.user && auth.user.role === 'admin') {
        return <AdminPanel />;
}else{
    <h1>Not authorized!</h1>
}
}

export default admin