import axios from 'axios'
import { Problem } from '../interfaces/Problems';
import { Image } from '../interfaces/Images';

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