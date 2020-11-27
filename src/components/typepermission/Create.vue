<template>
  <div>
    <h2>{{ form.id == null ? "Crear" : "Actualizar" }} Tipo Permiso</h2>

    <el-form :model="form" :rules="rules" ref="ruleForm">

      <el-form-item v-model="form.description" label="Descripción">
        <el-input placeholder="Descripción"></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="onSave">Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>



<script>
export default {
 name:'typecreate',


   data() {
     return {
         form:{
           id:0,
           description:null
         },

          rules: {
   description: [
     {
       require: true,
       message: "Por favor el campo Descripción es requerido",
       trigger: "blur",
     },
   ]
 },
     }
 },
    created() {
        
         let self = this;
         self.get(self.$route.params.code);
         
    },

    methods: {
 
 
     get(id) {
  if(id==undefined) return;
  let self = this;
  self.loading = true;
  self.$store.state.services.typepermissionService
    .getTypePermissionFor(id)
    .then((r) => {
      self.form.id = r.data.id;
      self.form.description = r.data.description;
    })
    .catch((r) => {
      self.$message({
        message: "Error inesperado",
        type: "error",
      });
    });
  self.loading = false;
},
 


 onSave() {
  let self = this;
  self.$refs["ruleForm"].validate((valid) => {
    if (valid) {
     
      if (self.form.id > 0) {
        self.$store.state.services.typepermissionService
          .update(self.form)
          .then((r) => {
            //self.loading = false;
            self.$router.push("/typepermission/Index");
          })
          .catch((r) => {
            self.$message({
              message: "Ocurrió un error inesperado",
              type: "error",
            });
          });
      } else {
        self.$store.state.services.typepermissionService
          .create(self.form)
          .then((r) => {
            //self.loading = false;
            self.$router.push("/typepermission/Index");
          })
          .catch((r) => {
            self.$message({
              message: "Ocurrió un error inesperado",
              type: "error",
            });
          });
      }
    }
  });
},

        
    }
}
</script>