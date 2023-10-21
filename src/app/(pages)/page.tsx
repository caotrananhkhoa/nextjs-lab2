'use client'

import useAuth from "@/context/useAuth"
import React, {useEffect} from 'react'
import ProfileCard from "@/components/ProfileCard"
import Login from "@/components/Login"

const Home = () => {
    const {authStatus} = useAuth()
}