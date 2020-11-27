class PermissionService {
    axios
    baseUrl

    constructor(axios,apiurl) {
        this.axios = axios
        this.baseUrl = `${apiurl}permission/`     
    }

    getAll() {
        let self = this;
        return self.axios.get(`${self.baseUrl}all/true`);
    }

    getPermissionFor(code) {
        let self = this;
        return self.axios.get(`${self.baseUrl}forid/${code}`);
    }
  
    create(model){
 
        let self = this;
        return self.axios.post(`${self.baseUrl}create/`,model);
    }
  
    update(model){
        let self = this;
        return self.axios.put(`${self.baseUrl}update/`,model);
    }
    
    delete(id){
        console.log("codigo a eliminar.: " + id);
        let self = this;
        return self.axios.delete(`${self.baseUrl}delete/${id}`);
    }
  
}

export default PermissionService