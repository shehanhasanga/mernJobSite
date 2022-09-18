import {useEffect} from "react";

const Dashboard = () => {
    const fetchData = async () => {
        try {
            // const res = await fetch('/data.json')
            const res = await fetch('http://localhost:9000/')
            const data = await res.json()
            console.log(data)
        }catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return(
        <h1>Dashboard</h1>
    )
}

export default Dashboard;
