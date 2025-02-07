"use client"
import React, { useEffect, useState } from 'react'
import { apiBaseUrl } from '@/lib/config';

interface Message {
    key: string;
}

console.log(`${apiBaseUrl}/test`)

const TestApiPage = () => {
    const [test, setTest] = useState<Message | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${apiBaseUrl}/test`);
            const data: Message = await res.json();
            console.log(data)
            setTest(data);
        }

        fetchData();
    }, []);

    return (
        <>
            <h1>Test</h1>
            {test ? <p>{test.key}</p> : <p>Loading...</p>}
        </>
    )
}

export default TestApiPage
