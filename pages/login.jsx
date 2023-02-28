import React, { useContext, useState, useEffect } from 'react'
import { DataContext } from '../store/GlobalState'
import { postData } from '../utils/fetchData'
import Cookie from 'js-cookie'
import HeaderText from '../components/HeaderText'
import { useRouter } from 'next/router'


function login() {
    const initialState = { userName: '', password: '' }
    const [userData, setUserData] = useState(initialState)
    const { userName, password } = userData
    const { state = {}, dispatch } = useContext(DataContext)
    const { auth = {} } = state
    const router = useRouter()

    const handleChangeInput = e => {
        const { name, value } = e.target
        setUserData({ ...userData, [name]: value })
    }
    const handleSubmit = async e => {
        e.preventDefault()

        const res = await postData('auth/login', userData)

        dispatch({
            type: 'AUTH', payload: {
                token: res.access_token,
                user: res.user
            }
        })

        Cookie.set('refreshtoken', res.refresh_token, {
            path: 'api/auth/accessToken',
            expires: 7
        })

        localStorage.setItem('firstLogin', true)
    }

    useEffect(() => {
        if (Object.keys(auth).length !== 0) router.push("/game")
    }, [auth])

    return (
        <body className='w-screen '>
            <HeaderText />
            <div className='flex justify-around'>
                <div className='w-1/2'></div>
                <div className="w-1/2">
                    <form className="bg-[#130326] shadow-md rounded w-full h-full" onSubmit={handleSubmit}>
                        <div className="">
                            <label className="block text-white font-bold" htmlFor="username">
                                Username
                            </label>
                            <input className="shadow appearance-none  rounded w-full py-2 px-3 bg-black text-white -700 leading-tight focus:outline-none focus:shadow-outline" id="username" name='userName' value={userName} onChange={handleChangeInput} type="text" placeholder="Username" />
                        </div>
                        <div className="mb-6">
                            <label className="block text-white  text-sm font-bold mb-2" htmlFor="password">
                                Password
                            </label>
                            <input className="shadow appearance-none   rounded w-full py-2 px-3 bg-black text-white -700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" name='password' value={password} onChange={handleChangeInput} placeholder="******************" />

                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-[#811029] hover:bg-[#ae1536] w-full text-white font-bold py-2 px-4 rounded-xl focus:outline-none focus:shadow-outline" type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                    <p className="text-center text-white  text-xs">
                        &copy;Chakri - Deltin Royale Games
                    </p>
                </div>

            </div>
        </body>

    )
}

export default login