<template>
  <div>
    <h2>Permisos</h2>

    <el-table v-loading="loading" :data="data" style="width: 100%">
      <el-table-column prop="id" label="Codigo" width="80"></el-table-column>
      <el-table-column prop="name" label="Nombre" sortable></el-table-column>
      <el-table-column
        prop="lastName"
        label="Apellido"
        sortable
      ></el-table-column>
      <el-table-column
        prop="typePermission.description"
        sortable
        label="Tipo de Permiso"
      ></el-table-column>
      <el-table-column
        prop="datePermission"
        label="Fecha Creacion"
      ></el-table-column>
      
      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="primary" @click="$router.push(`/Permission/${scope.row.id}/edit`)"  > Editar </el-button>
        </template>
      </el-table-column>

      <el-table-column align="right">
        <template slot-scope="scope">
          <el-button type="danger" @click="onDelete(scope.row.id)"> Eliminar </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "PermissionIndex",
  data() {
    return {
      loading: false,
      data: [],
    };
  },

  created() {
    let self = this;
    self.getAll();
  },

  methods: {
    getAll() {
      let self = this;
      self.loading = true;
      self.$store.state.services.permissionService
        .getAll()
        .then((r) => {
             self.loading = false;
          self.data = r.data;
        })
        .catch((r) => {
          self.$message({
            message: "Error inesperado",
            type: "error",
          });
        });
      self.loading = false;
    },


        onDelete(row) {
           let self = this;

         this.$confirm('Esta usted seguro de querer elimanar este permiso?')
          .then(_ => {
            remover();
          })
          .catch(_ => {});

         function remover(){
 self.$store.state.services.permissionService
   .delete(row)
   .then((r) => {
     
     self.getAll();
   })
   .catch((r) => {
     self.$message({
       message: "Ocurrió un error inesperado",
       type: "error",
     });
   });

         }

        }

  }
};
</script>