import { useFetch } from "@vueuse/core"

export const getHitters = (params = {}) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await useFetch('/api/hitter/getHitters', {
                method: 'GET',
            })

            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}

/* GET Individual Hitter */
export const getHitterById = (hitterId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const response = await useFetch(`/api/hitter/getHitterById?hitterId=${hitterId}`)

            resolve(response)
        } catch (error) {
            reject(error)
        }
    })
}