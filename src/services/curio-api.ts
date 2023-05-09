import axios from 'axios'

interface ILocation { 
    city: string,
    state: string,
    country: string
}

export async function getAllProblems(page: number, limit: number): Promise<any>{
       try {
            const result = await axios({
                method: 'get',
                url: `https://projeto-curio.cyclic.app/api/v1/problems/?page=${page}&limit=${limit}`,
                headers: {
                    'api-key': process.env.REACT_APP_CURIO_KEY
                }
            });
            return result.data
       } catch (error) {
           return 'error_api'
       }
}

export async function getCities(): Promise<any>{
    try {
         const result = await axios({
             method: 'get',
             url: `https://projeto-curio.cyclic.app/api/v1/problems/cities`,
             headers: {
                 'api-key': process.env.REACT_APP_CURIO_KEY
             }
         });
         return result.data
    } catch (error) {
        return 'error_api'
    }
}

export async function getAllProblemsByLocation(location: ILocation, page: number, limit: number): Promise<any>{
    const { country, state, city } = location
    console.log('[getAllProblemsByLocation] location - page - limit ', location, page, limit)
    const url = `https://projeto-curio.cyclic.app/api/v1/problems/location?country=${country}&state=${state}&city=${city}&page=${page}&limit=${limit}`
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
export async function getProblemByUUID(uuid: string): Promise<any>{
    try {
        const result = await axios({
            method: 'get',
            url: `https://projeto-curio.cyclic.app/api/v1/problems/${uuid}`,
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
    try {
        const result = await axios({
            method: 'get',
            url: `https://projeto-curio.cyclic.app/api/v1/problems/${uuid}/images`,
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
    try {
        const result = await axios({
            method: 'get',
            url: `https://projeto-curio.cyclic.app/api/v1/problems/images/${uuid}`,
            headers: {
                'api-key': process.env.REACT_APP_CURIO_KEY
            }
        });
        return result.data
   } catch (error) {
       return 'error_api'
   }
}