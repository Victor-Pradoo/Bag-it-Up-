import api from './api.js'

export const SalvaViagem = async(destino) => {
    return api.post('viagem/save', {destino});
}