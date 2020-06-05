<template>
    <div class="mt-5">
        <section class="content">
            <!-- Default box -->
            <div class="card">
                <div class="card-header bg-gray-dark">
                    <h3 class="card-title pt-1">Materials</h3>
                </div>
                <div class="card-body p-0">
                    <table class="table table-striped projects">
                        <thead>
                        <tr class="text-center">
                            <th>Request Number</th>
                            <th>Material Group 1</th>
                            <th>Material Group 2</th>
                            <th>Material Group 3</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="material in materials" :key="material.matHeaderID" class="text-center">
                            <td>{{material.creationHeaderID}}</td>
                            <td>{{material.matGrp1}}</td>
                            <td>{{material.matGrp2}}</td>
                            <td>{{material.matGrp3}}</td>
                            <td class="project-state">
                                <span class="badge" :class="material.approved ? 'badge-success' : 'badge-danger'">
                                    {{material.approved ? 'Approved' : 'Not Approved'}}
                                </span>
                            </td>
                            <td class="project-actions text-center">
                                <button class="btn btn-success btn-sm tooltipster" title="Edit" type="button" data-toggle="modal"
                                        data-target="#editMaterialModal">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button class="btn btn-danger btn-sm tooltipster" title="Delete">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <!-- /.card-body -->
            </div>
            <!-- /.card -->

            <!-- View & Approve Header Modal -->
            <CreateMaterial class="modal fade" id="editMaterialModal"></CreateMaterial>
        </section>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    import CreateMaterial from "./CreateMaterial";

    export default {
        components: {
          CreateMaterial
        },
        mounted() {
            $('.tooltipster').tooltipster({
                theme: 'tooltipster-borderless',
                animation: 'grow',
                contentCloning: true
            });
        },
        methods: {

        },
        computed: {
            ...mapState(["materials"])
        }
    }
</script>
