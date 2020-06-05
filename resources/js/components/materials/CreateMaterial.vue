<template>
    <div class="modal fade" id="viewModal">
        <div class="modal-dialog modal-xl">
            <div class="modal-content">
                <div class="modal-header bg-gradient-success">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <form role="form" @submit.prevent="" class="row">
                        <div class="col-sm-6">
                            <div class="card card-success card-outline">
                                <div class="card-header">
                                    <h3 class="card-title">Request Details</h3>
                                </div>
                                <div class="card-body">
                                    <!-- Request Details -->
                                    <dl>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Requestor:</dt>
                                            <dd class="col-sm-8 m-0">{{requestor}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Material Type:</dt>
                                            <dd class="col-sm-8 m-0">{{materialTypeDescription}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Long Description:</dt>
                                            <dd class="col-sm-8 m-0">{{header.longDescription}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Short Description:</dt>
                                            <dd class="col-sm-8 m-0">{{header.shortDescription}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Mfr Part Number:</dt>
                                            <dd class="col-sm-8 m-0">{{header.mfrPartNumber}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Buy Price:</dt>
                                            <dd class="col-sm-8 m-0">{{'₱' + header.buyPrice}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Date Requested:</dt>
                                            <dd class="col-sm-8 m-0">{{header.dateRequested}}</dd>
                                        </div>
                                        <div class="row align-items-center mx-1">
                                            <dt class="col-sm-4 m-0">Approver:</dt>
                                            <dd class="col-sm-8 m-0">{{approverName}}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div class="col-sm-6">
                            <!-- general form elements -->
                            <div class="card card-success card-outline">
                                <div class="card-header">
                                    <h3 class="card-title">Material Group Form</h3>
                                </div>
                                <!-- /.card-header -->
                                <div class="card-body">
                                    <div class="row align-items-center">
                                        <!-- Product Manager -->
                                        <div class="col-sm-8">
                                            <span class="text-sm text-bold mr-1">PRODUCT MANAGER:</span>
                                            <span>{{approverName}}</span>
                                        </div>
                                        <!-- Approved -->
                                        <div class="col-sm-4 p-0">
                                            <div class="row align-items-center">
                                                <div class="col-sm-6 text-bold">Approved:</div>
                                                <div class="col-sm-6">
                                                    <div class="custom-control custom-radio">
                                                        <div>
                                                            <input class="custom-control-input" type="radio" id="approvedYes"
                                                                   name="approvalStatus" value="YES" v-model="form.approvalStatus">
                                                            <label for="approvedYes" class="custom-control-label">Yes</label>
                                                        </div>
                                                        <div>
                                                            <input class="custom-control-input" type="radio" id="approvedNo"
                                                                   name="approvalStatus" value="NO" v-model="form.approvalStatus">
                                                            <label for="approvedNo" class="custom-control-label">No</label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <has-error :form="form" field="approvalStatus"></has-error>
                                        </div>
                                    </div>
                                    <!-- Material Group 1 -->
                                    <div class="form-group row mt-2 align-items-center" v-if="matGrp1Options.length > 0">
                                        <div class="col-sm-4"><label for="materialGroup1">Material Group 1:</label></div>
                                        <div class="col-sm-8 p-0">
                                            <select class="form-control select2" style="width: 100%;"
                                                    id="materialGroup1" name="materialGroup1">
                                                <option value=" " disabled selected>Please select one</option>
                                                <option v-for="matGrp1Option in matGrp1Options" :key="matGrp1Option.id" onchange="sample(this.value)">
                                                    {{matGrp1Option.value}}</option>
                                            </select>
                                            <has-error :form="form" field="materialGroup1"></has-error>
                                        </div>
                                    </div>
                                    <!-- Material Group 2 -->
                                    <div class="form-group row mt-2 align-items-center" v-if="matGrp2Options.length > 0">
                                        <div class="col-sm-4"><label for="materialGroup2">Material Group 2:</label></div>
                                        <div class="col-sm-8 p-0">
                                            <select class="form-control select2" style="width: 100%;"
                                                    id="materialGroup2" name="materialGroup2">
                                                <option value=" " disabled selected>Please select one</option>
                                                <option v-for="matGrp2Option in matGrp2Options" :key="matGrp2Option.id">
                                                    {{matGrp2Option.value}}</option>
                                            </select>
                                            <has-error :form="form" field="materialGroup2"></has-error>
                                        </div>
                                    </div>
                                    <!-- Material Group 3 -->
                                    <div class="form-group row mt-2 align-items-center" v-if="matGrp3Options.length > 0">
                                        <div class="col-sm-4"><label for="materialGroup2">Material Group 3:</label></div>
                                        <div class="col-sm-8 p-0">
                                            <select class="form-control select2" style="width: 100%;"
                                                    id="materialGroup3" name="materialGroup3">
                                                <option value=" " disabled selected>Please select one</option>
                                                <option v-for="matGrp3Option in matGrp3Options" :key="matGrp3Option.id">
                                                    {{matGrp3Option.value}}</option>
                                            </select>
                                            <has-error :form="form" field="materialGroup3"></has-error>
                                        </div>
                                    </div>
                                    <!-- Category Assignment -->
                                    <div class="form-group row mt-2 align-items-center">
                                        <div class="col-sm-4"><label for="categoryAssignment">Category Assignment:</label></div>
                                        <div class="col-sm-8 p-0">
                                            <input type="text" id="categoryAssignment" name="categoryAssignment"
                                                   class="form-control border-0 w-100 text-bold" readonly v-model="computedCategoryAssignment">
                                        </div>
                                    </div>
                                </div>
                                <!-- /.card-body -->
                            </div>
                            <!-- /.card -->
                        </div>
                    </form>
                </div>
                <div class="modal-footer justify-content-between">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-success">Submit</button>
                </div>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
</template>

<script>
    import {Form} from 'vform'
    import {mapState, mapActions} from 'vuex'

    export default {
        name: "CreateMaterial",
        mounted() {
            this.$eventBus.$on("createMaterial", (header) => {
                this.header = header;
                // Change this to user's name
                this.materialTypeDescription = this.materialTypeOptions.find(materialType => materialType.id === header.materialTypeID).value;
                this.approverName = this.approverOptions.find(approver => approver.materialTypeID === header.materialTypeID).value;
                this.requestor = 'Alexander Pierce';
            });

            const vm = this;
            $('.select2').select2({theme: 'bootstrap4'});
            $('#materialGroup1').change(() => {
                vm.changeMatGrp1($('#materialGroup1').val());
            });
            $('#materialGroup2').change(() => {
                vm.changeMatGrp2($('#materialGroup2').val());
            });
            $('#materialGroup3').change(() => {
                vm.form.materialGroup3 = $('#materialGroup3').val();
            });
        },
        data() {
            return {
                form: new Form({
                    approvalStatus: '',
                    materialGroup1: '',
                    materialGroup2: '',
                    materialGroup3: '',
                    categoryAssignment: ''
                }),
                requestor: '',
                materialTypeDescription: '',
                approverName: '',
                header: {},
                matGrp1: {},
                matGrp2: {},
                matGrp3: {},
            }
        },
        computed: {
            ...mapState(["matGrp1Options", "matGrp2Options", "matGrp3Options", "materialTypeOptions", "approverOptions"]),
            computedCategoryAssignment() {
                // This computes the Category Assignment value with the following params & format
                // grp1ID + grp2ID + grp3ID + ' ' + grp1Value + '-' + grp2Value + '.' + grp3Value
                this.form.categoryAssignment = "100308432 BUSS APPLICATION - SERVICE.IVEND";
                return this.form.categoryAssignment;
            }
        },
        methods: {
            ...mapActions(["getMaterialGroup2Options", "getMaterialGroup3Options"]),
            changeMatGrp1(materialGroup1) {
                this.form.materialGroup1 = materialGroup1;
                this.matGrp1 = this.matGrp1Options.find(option => option.value === materialGroup1);
                this.getMaterialGroup2Options(this.matGrp1);
            },
            changeMatGrp2(materialGroup2) {
                this.form.materialGroup2 = materialGroup2;
                this.matGrp2 = this.matGrp2Options.find(option => option.value === materialGroup2);
                this.getMaterialGroup3Options(this.matGrp2);
            },
            sample(value) {
                console.log(value);
            }
        }
    }
</script>

<style scoped>

</style>
