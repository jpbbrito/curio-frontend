import axios from 'axios'
interface ILocation {
    city: string,
    state: string,
    country: string
}

interface IProblem {
    description: string,
    address: string,
    reporterUsername?: string,
    reporterName: string,
    longiture: string,
    latitude: string,
    category?: string
}

export async function getAllProblems(page: number, limit: number): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    console.log('process.env.REACT_APP_CURIO_URL -', process.env.REACT_APP_CURIO_URL)
    try {
        const result = await axios({
            method: 'get',
            url: `${url_curio}/api/v1/problems/?page=${page}&limit=${limit}`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function getCities(): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'get',
            url: `${url_curio}/api/v1/problems/cities`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function getAllProblemsByLocation(location: ILocation, page: number, limit: number): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    const { country, state, city } = location
    console.log('[getAllProblemsByLocation] location - page - limit ', location, page, limit)
    const url = `${url_curio}/api/v1/problems/location?country=${country}&state=${state}&city=${city}&page=${page}&limit=${limit}`
    try {
        const result = await axios({
            method: 'get',
            url,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        console.log('[getAllProblemsByLocation] result.data - ', result)
        return result.data
    } catch (error) {
        return 'error_api'
    }
}
export async function getProblemByUUID(uuid: string): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'get',
            url: `${url_curio}/api/v1/problems/${uuid}`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function getAllImagesByUUID(uuid: string): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'get',
            url: `${url_curio}/api/v1/problems/${uuid}/images`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function getImageByUUID(uuid: string): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'get',
            url: `${url_curio}/api/v1/problems/images/${uuid}`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function saveProblem(problem: IProblem): Promise<any> {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'post',
            url: `${url_curio}/api/v1/problems`,
            data: {
                ...problem,
                reporterUsername: 'WEB_BROWSER',
                category: 'generico'
            },
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        })
        return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function saveImageProblem(uuid: string, imageBase64: string) {
    const url_curio = process.env.REACT_APP_CURIO_URL;
    try {
        const result = await axios({
            method: 'post',
            url: `${url_curio}/api/v1/problems/${uuid}/images`,
            data: {
                description: ' ',
                base64: imageBase64
            },
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        })
        return result.data
    } catch (error) {
        return 'error_api'
    }
}