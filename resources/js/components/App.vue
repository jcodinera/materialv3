<template>
    <div class="hold-transition sidebar-mini layout-fixed">
        <div class="wrapper">
            <!-- Navbar -->
            <nav class="main-header navbar navbar-expand navbar-white navbar-light">
                <!-- Left navbar links -->
                <ul class="navbar-nav">
                    <li class="nav-item d-none d-sm-inline-block" @click="removeActiveNav">
                        <router-link :to="{name: 'home'}" class="nav-link">Home</router-link>
                    </li>
                </ul>

                <!-- Right navbar links -->
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item dropdown">
                        <router-link :to="{name: 'login'}" class="nav-link">Login</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link :to="{name: 'register'}" class="nav-link">Register</router-link>
                    </li>
                    <li class="nav-item dropdown">
                        <router-link to="" class="nav-link">Logout</router-link>
                    </li>
                </ul>
            </nav>
            <!-- /.navbar -->

            <!-- Main Sidebar Container -->
            <div class="main-sidebar sidebar-dark-primary elevation-4">
                <!-- Brand Logo -->
                <div class="brand-link">
                    <span class="brand-text font-weight-light text-md">Integrated Computer Systems, Inc.</span>
                </div>

                <!-- Sidebar -->
                <div class="sidebar">
                    <!-- Sidebar user panel (optional) -->
                    <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                        <div class="image">
                            <img :src="sampleImage" class="img-circle elevation-2" alt="User Image">
                        </div>
                        <div class="info">
                            <a href="#" class="d-block">Alexander Pierce</a>
                        </div>
                    </div>

                    <!-- Sidebar Menu -->
                    <nav class="mt-2">
                        <ul class="nav nav-pills nav-sidebar flex-column">
                            <li class="nav-item" @click="changeNav('headers')">
                                <router-link :to="{name: 'headers'}" class="nav-link" exact-active-class="active">
                                    <i class="nav-icon fas fa-newspaper"></i>
                                    <p>Headers</p>
                                </router-link>
                            </li>
                            <li class="nav-item" @click="changeNav('materials')">
                                <router-link :to="{name: 'materials'}" class="nav-link" exact-active-class="active">
                                    <i class="nav-icon fas fa-archive"></i>
                                    <p>Materials</p>
                                </router-link>
                            </li>
                        </ul>
                    </nav>
                    <!-- /.sidebar-menu -->
                </div>
                <!-- /.sidebar -->
            </div>

            <!-- Content Wrapper. Contains page content -->
            <div class="content-wrapper">
                <router-view></router-view>
            </div>
            <!-- /.content-wrapper -->

            <!-- Main Footer -->
            <footer class="main-footer">
                <!-- To the right -->
                <div class="float-right d-none d-sm-inline">
                    Material version 3
                </div>
                <!-- Default to the left -->
                <strong>Copyright &copy; 2020 <a href="https:/ics.com.ph">Integrated Computer Systems, Inc.</a></strong> All rights reserved.
            </footer>
        </div>
        <!-- ./wrapper -->
    </div>
</template>

<script>
    import sampleImage from 'admin-lte/dist/img/avatar.png'
    import {mapActions} from 'vuex'

    export default {
        name: "App",
        data() {
            return {
                sampleImage: sampleImage,
                activeNav: ''
            }
        },
        methods: {
            ...mapActions(["getMaterialTypeOptions"]),
            changeNav(activeNav) {
                this.activeNav = activeNav;
            },
            removeActiveNav() {
                this.activeNav = '';
            }
        },
        created() {
            // Uncomment this to get material types thru axios
            // this.getMaterialTypeOptions();
        }
    }
</script>

<style>

</style>
