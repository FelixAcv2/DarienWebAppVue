import Axios from 'axios'
import exampleService from '../services/ExampleService'
import permissionService from '../services/PermissionService'
import typepermissionService from '../services/TypePermissionService'


let apiurl='https://localhost:44392/api/'

// Axios Configuration
Axios.defaults.headers.common.Accept = 'application/json'

export default {
    exampleService: new exampleService(Axios),
    permissionService:new permissionService(Axios,apiurl),
    typepermissionService:new typepermissionService(Axios,apiurl)
    
}