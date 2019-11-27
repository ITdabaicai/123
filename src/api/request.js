import instance from './http.js'

export const userlogin = (data) => {
    return instance.service.post('/company/login', data)
}
export const islogin = () => {
    return instance.service.get('/company')
}

