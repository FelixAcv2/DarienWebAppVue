<template>
  <div>
    <h2>{{ form.id == null ? "Crear" : "Actualizar" }} Permiso</h2>

    <el-form :model="form" :rules="rules" ref="ruleForm">
      <el-form-item label="Nombre" prop="name">
        <el-input v-model="form.name" placeholder="Nombre"></el-input>
      </el-form-item>

      <el-form-item label="Apellido" prop="lastname">
        <el-input v-model="form.lastname" placeholder="Apellido"></el-input>
      </el-form-item>

      <el-form-item label="Tipo de Permiso">
        <el-select
          v-model="seletedItem"
          placeholder="Selecionar Tipo de Permiso"
        >
          <el-option
            v-for="item in itemsType"
            :key="item.id"
            :label="item.description"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="">
        <el-button type="primary" @click="onSave">Salvar</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>




<script>
export default {
  name: "PermissionCreate",
  data() {
    return {
      form: {
        id: 0,
        name: null,
        lastname: null,
        typePermissionId: null,
      },

      itemsType: [],
      seletedItem: [],
      code: 0,

      rules: {
        name: [
          {
            require: true,
            message: "Por favor el campo Nombre es requerido",
            trigger: "blur",
          },
        ],

        lastname: [
          {
            require: true,
            message: "Por favor el campo Apellido es requerido",
            trigger: "blur",
          },
        ],
      },
    };
  },

  created() {
    let self = this;
    self.getAllTypes();

    self.get(self.$route.params.code);
  },

  methods: {
    getAllTypes() {
      let self = this;
      self.loading = true;
      self.$store.state.services.typepermissionService
        .getAll()
        .then((r) => {
          self.itemsType = r.data;
        })
        .catch((r) => {
          self.$message({
            message: "Error inesperado",
            type: "error",
          });
        });
      self.loading = false;
    },

    get(id) {
      if(id==undefined) return;

      let self = this;
      self.loading = true;
      self.$store.state.services.permissionService
        .getPermissionFor(id)
        .then((r) => {
          self.form.id = r.data.id;
          self.form.name = r.data.name;
          self.form.lastname = r.data.lastName;
          self.form.typePermissionId = r.data.typePermissionId;
          this.seletedItem = r.data.typePermissionId;
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
          self.form.typePermissionId = this.seletedItem;

          if (self.form.id > 0) {
            self.$store.state.services.permissionService
              .update(self.form)
              .then((r) => {
                //self.loading = false;
                self.$router.push("/permission/Index");
              })
              .catch((r) => {
                self.$message({
                  message: "Ocurrió un error inesperado",
                  type: "error",
                });
              });
          } else {
            self.$store.state.services.permissionService
              .create(self.form)
              .then((r) => {
                //self.loading = false;
                self.$router.push("/permission/Index");
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
  },
};
</script>