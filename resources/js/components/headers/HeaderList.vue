<template>
    <div class="mt-5">
        <section class="content">

            <!-- Default box -->
            <div class="card">
                <div class="card-header bg-gradient-secondary">
                    <h3 class="card-title pt-1">Requests</h3>
                    <button class="btn bg-gradient-primary btn-sm float-right" type="button" data-toggle="modal"
                            data-target="#createHeaderModal" @click="createHeaderEvent">
                        <i class="fas fa-plus-circle"></i>
                        <span>New</span>
                    </button>
                </div>
                <div class="card-body p-0">
                    <table class="table table-striped projects">
                        <thead>
                        <tr class="text-center">
                            <th>Material Type</th>
                            <th>Mfr Part Number</th>
                            <th>Buy Price</th>
                            <th>Date Requested</th>
                            <th>Approver</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="header in headers" :key="header.creationHeaderID" class="text-center">
                            <td>{{materialTypeDescription(header.materialTypeID)}}</td>
                            <td>{{header.mfrPartNumber}}</td>
                            <td>{{'₱' + header.buyPrice}}</td>
                            <td>{{header.dateRequested}}</td>
                            <td>{{approverName(header.materialTypeID)}}</td>
                            <td class="project-actions text-center">
                                <button class="btn btn-success btn-sm tooltipster" title="View/Approve" data-toggle="modal"
                                        data-target="#createMaterialModal" @click="viewHeader(header)">
                                    <i class="fas fa-check-circle"></i>
                                </button>
                                <button class="btn btn-info btn-sm tooltipster" title="Edit" type="button" data-toggle="modal"
                                        data-target="#createHeaderModal" @click="edit(header)">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-danger btn-sm tooltipster" title="Delete" @click="remove(header.id)">
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
            <CreateMaterial class="modal fade" id="createMaterialModal"></CreateMaterial>

            <!-- Create Material Modal -->
            <CreateHeader class="modal fade" id="createHeaderModal"></CreateHeader>
        </section>
    </div>
</template>

<script>
    import {mapState, mapActions} from 'vuex'
    import CreateHeader from "./CreateHeader";
    import CreateMaterial from "../materials/CreateMaterial";

    export default {
        components: {
            CreateHeader,
            CreateMaterial
        },
        data() {
          return {
              currentMaterial: {}
          }
        },
        mounted() {
            this.$eventBus.$on("hideCreateHeaderModal", () => {
                $('#createHeaderModal').modal('hide');
            });

            $('.tooltipster').tooltipster({
                theme: 'tooltipster-borderless',
                animation: 'grow',
                contentCloning: true
            });
        },
        methods: {
            ...mapActions(["removeHeader"]),
            materialTypeDescription(id) {
                return this.materialTypeOptions.find(materialType => materialType.id === id).value;
            },
            approverName(id) {
                return this.approverOptions.find(approver => approver.materialTypeID === id).value;
            },
            viewHeader(header) {
                this.$eventBus.$emit("createMaterial", header);
            },
            createHeaderEvent() {
                this.$eventBus.$emit("createHeaderEvent");
            },
            edit(request) {
                this.$eventBus.$emit("editRequestEvent", request);
            },
            remove(id) {
                this.removeHeader(id);
            }
        },
        computed: {
          ...mapState(["headers", "materialTypeOptions", "approverOptions"]),
        }
    }
</script>

<style scoped>

</style>
