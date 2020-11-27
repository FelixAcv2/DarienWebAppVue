<template>
<div>
<h2>Tipos de permisos</h2>
<div v-loading="loading">
  <el-table :data="items" :default-sort = "{prop: 'title', order: 'ascending'}" style="width: 100%">
    <el-table-column prop="id" label="Id" sortable width="50"></el-table-column>
    <el-table-column prop="description" label="Descripción" sortable></el-table-column>

   
   
    
 <el-table-column align="right">
   <template slot-scope="scope">
     <el-button type="primary" @click="$router.push(`/typepermission/${scope.row.id}/edit`)"  > Editar </el-button>
   </template>
 </el-table-column>

 <el-table-column align="left">
   <template slot-scope="scope">
     <el-button type="danger" @click="onDelete(scope.row.id)"> Eliminar </el-button>
   </template>
 </el-table-column>

  </el-table>
</div>
</div>
</template>

<script>
export default {
  name: "typeindex",
  data() {
    return {
      loading: false,
      items: [],
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

      self.$store.state.services.typepermissionService
        .getAll()
        .then((r) => {
          self.loading = false;
          self.items = r.data;
        })
        .catch((r) => {});
    },

    onDelete(row) {
      let self = this;

      this.$confirm("Esta usted seguro de querer elimanar este tipo permiso?")
        .then((_) => {
          remover();
        })
        .catch((_) => {});

      function remover() {
        self.$store.state.services.typepermissionService
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
    },
  },
};
</script>