  
<template>
<el-menu default-active="0">
    <template v-for="item, i in items">
        <el-submenu :index="i.toString()" v-if="item.children !== undefined">
            <template slot="title">
                <i :class="'fa fa-' + item.icon"></i>
                <span>{{ item.text }}</span>
            </template>
            <el-menu-item-group title="Opciones">
                <el-menu-item v-for="child, c in item.children" :index="(i.toString() + c)" @click="redirect(child.path)">
                    <i :class="'fa fa-' + child.icon"></i> <span>{{ child.text }}</span>
                </el-menu-item>
            </el-menu-item-group>    
        </el-submenu>
        <el-menu-item index="2" v-if="item.children === undefined" @click="redirect(item.path)">
            <i :class="'fa fa-' + item.icon"></i>
            <span>{{ item.text }}</span>
        </el-menu-item>
    </template>
</el-menu>
</template>

<script>
export default {
  name: "NavegationMenu",
  data: () => ({
    items: [
      { icon: "dashboard", text: "Dashboard", path: "/" },





      {
   icon: "start",
   text: "Tipo Permiso ",
   children: [
     { icon: "list", text: "Tipos de Permisos", path: "/typepermission/Index" },
     { icon: "plus", text: "Agregar", path: "/typepermission/Create" },
   ],
 },


                                                                           
      {
        icon: "wrench",
        text: "Permiso",
        children: [
          { icon: "list", text: "Permisos", path: "/Permission/Index" },
          { icon: "plus", text: "Agregar", path: "/Permission/Create" },
        ],
      },
    ],
  }),
  methods: {
    redirect(path) {
      if (path === undefined) return;
      this.$router.push(path);
    },
  },
};
</script>