import axios from "axios";


const baseurl = 'https://the-job-finder-back-end.onrender.com/api/v1/jobs'

const getall = async () => {
    const response = await axios.get(baseurl)
    return response.data
}

const jobsService = { getall };

export default jobsService;