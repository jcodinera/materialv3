<template>
    <div>
        <div class="modal-dialog">
            <div class="modal-content">
                <form @submit.prevent="editMode ? edit() : create()">
                    <div class="modal-header" :class="editMode ? 'bg-gradient-info' : 'bg-gradient-primary'">
                        <h4 class="modal-title">{{editMode ? 'Edit Request' : 'New Request'}}</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <!-- Requestor -->
                        <div class="form-group row align-items-center">
                            <label for="requestor" class="col-sm-3 m-0 pl-0">REQUESTOR: </label>
                            <input type="text" id="requestor" name="requestor" class="col-sm-9 form-control w-100" readonly v-model="requestor">
                        </div>
                        <!-- Material Type -->
                        <div class="form-group row align-items-center">
                            <label for="materialType" class="col-sm-3 m-0 pl-0">Material Type: </label>
                            <div class="col-sm-9 p-0">
                                <select class="form-control select2 select2-blue" style="width: 100%;"
                                        id="materialType" name="materialType" :class="{'is-invalid': form.errors.has('materialType')}">
                                    <option value=" " disabled="disabled" selected>Please select one</option>
                                    <option v-for="materialType in materialTypeOptions" :key="materialType.id">
                                        {{materialType.value}}</option>
                                </select>
                                <has-error :form="form" field="materialType"></has-error>
                            </div>
                        </div>
                        <!-- Approver -->
                        <div class="form-group row align-items-center" v-if="approverOptions.length > 0">
                            <label for="approver" class="col-sm-3 m-0 pl-0">Approver: </label>
                            <div class="col-sm-9 p-0">
                                <select class="form-control select2" style="width: 100%;" :class="{'is-invalid': form.errors.has('approver')}"
                                        id="approver" name="approver">
                                    <option value=" " disabled="disabled" selected>Please select one</option>
                                    <option v-for="approver in approverOptions" :key="approver.id">
                                        {{approver.value}}</option>
                                </select>
                                <has-error :form="form" field="approver"></has-error>
                            </div>
                        </div>
                        <!-- Long Description -->
                        <div class="row">
                            <label for="longDescription">
                                Long Description:
                                <span class="longDescriptionTooltip"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <textarea name="longDescription" id="longDescription" class="form-control" v-model="form.longDescription"
                                      :class="{'is-invalid': form.errors.has('longDescription')}">
                            </textarea>
                            <has-error :form="form" field="longDescription"></has-error>

                            <!-- Long Description Tooltip -->
                            <div class="tooltip_templates">
                                <div id="longDescriptionTooltipContent">
                                    <div class="row text-primary">
                                        <div class="col-sm-1">HW:</div>
                                        <div class="col-sm-11">(Primary Component) brand/model/CPU/HDD/memory/opt drive/OS</div>
                                        <div class="offset-sm-1 col-sm-11">(Secondary Component) wlan/security/camera/screen type & size/software/input devices</div>
                                    </div>
                                    <div class="row text-info mt-1">
                                        <div class="col-sm-1">SWP:</div>
                                        <div class="col-sm-11">brand/model/general description</div>
                                    </div>
                                    <div class="row text-warning mt-1">
                                        <div class="col-sm-1">CSD:</div>
                                        <div class="col-sm-11">brand/model/general description</div>
                                    </div>
                                    <div class="row text-danger mt-1">
                                        <div class="col-sm-1">CAC:</div>
                                        <div class="col-sm-11">brand/PN [or] model#/capacity/where used</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <!-- Short Description -->
                        <div class="row mt-2">
                            <label for="shortDescription">
                                Short Description:
                                <span class="shortDescriptionTooltip"><i class="fas fa-question-circle"></i></span>
                            </label>
                            <textarea name="shortDescription" id="shortDescription" class="form-control" v-model="form.shortDescription"
                                      :class="{'is-invalid': form.errors.has('shortDescription')}">
                            </textarea>
                            <has-error :form="form" field="shortDescription"></has-error>

                            <!-- Short Description Tooltip -->
                            <div class="tooltip_templates">
                                <div id="shortDescriptionTooltipContent">
                                    <div class="row text-primary">
                                        <div class="col-sm-1">HW:</div>
                                        <div class="col-sm-11">brand/model/CPU/HDD/memory/opt drive/OS</div>
                                    </div>
                                    <div class="row text-info mt-1">
                                        <div class="col-sm-1">SWP:</div>
                                        <div class="col-sm-11">brand/model/general description</div>
                                    </div>
                                    <div class="row text-warning mt-1">
                                        <div class="col-sm-1">CSD:</div>
                                        <div class="col-sm-11">brand/model/general description</div>
                                    </div>
                                    <div class="row text-danger mt-1">
                                        <div class="col-sm-1">CAC:</div>
                                        <div class="col-sm-11">brand/PN [or] model#/capacity/where used</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row align-items-center mt-3">
                            <!-- Mfr Part Number -->
                            <div class="col-sm-2 pl-0"><label for="mfrPartNumber">Mfr Part Number:</label></div>
                            <div class="col-sm-4 p-0">
                                <input type="text" class="form-control" name="mfrPartNumber" id="mfrPartNumber" v-model="form.mfrPartNumber"
                                       :class="{'is-invalid': form.errors.has('mfrPartNumber')}">
                                <has-error :form="form" field="mfrPartNumber"></has-error>
                            </div>
                            <!-- Buy Price -->
                            <div class="col-sm-2 pr-0"><label for="buyPrice">Buy Price:</label></div>
                            <div class="col-sm-4">
                                <input type="number" class="form-control" name="buyPrice" id="buyPrice" v-model="form.buyPrice"
                                       :class="{'is-invalid': form.errors.has('buyPrice')}">
                                <has-error :form="form" field="buyPrice"></has-error>
                            </div>
                        </div>
                        <!-- Date Requested -->
                        <div class="row align-items-center">
                            <div class="col-sm-3 pl-0"><label for="dateRequested">Date Requested:</label></div>
                            <input type="text" id="dateRequested" name="dateRequested" class="col-sm-9 form-control w-100" readonly v-model="form.dateRequested"
                                   :class="{'is-invalid': form.errors.has('dateRequested')}" v-if="!editMode">
<!--                            <input type="text" id="editDateRequested" name="dateRequested" class="col-sm-9 form-control w-100"-->
<!--                                   :class="{'is-invalid': form.errors.has('dateRequested')}" v-if="editMode">-->
                            <input type="text" name="dateRequested" id="editDateRequested" class="form-control col-sm-9"/>
                        </div>
                        <!-- Reference Doc -->
                        <div class="row align-items-center">
                            <div class="col-sm-3 pl-0"><label for="summernote">Reference Doc:</label></div>
                            <textarea name="referenceDoc" id="summernote" class="form-control" v-model="form.referenceDoc"
                                      :class="{'is-invalid': form.errors.has('referenceDoc')}">
                            </textarea>
                            <has-error :form="form" field="referenceDoc"></has-error>
                        </div>
                    </div>
                    <div class="modal-footer justify-content-between">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="submit" class="btn" :class="editMode ? 'btn-info' : 'btn-primary'">{{editMode ? 'Update' : 'Create'}}</button>
                    </div>
                </form>
            </div>
            <!-- /.modal-content -->
        </div>
        <!-- /.modal-dialog -->
    </div>
    <!-- /.modal -->
</template>

<script>
    import {Form} from 'vform'
    import {mapActions, mapState, mapGetters} from 'vuex'
    import moment from 'moment'

    export default {
        name: "CreateHeader",
        components: {

        },
        mounted() {
            const vm = this;
            $('.select2').select2({theme: 'bootstrap4'});
            $('.longDescriptionTooltip').tooltipster({
                theme: 'tooltipster-borderless',
                animation: 'grow',
                side: 'right',
                maxWidth: 700,
                content: $('#longDescriptionTooltipContent'),
                contentCloning: true
            });
            $('.shortDescriptionTooltip').tooltipster({
                theme: 'tooltipster-borderless',
                animation: 'grow',
                side: 'right',
                minWidth: 600,
                content: $('#shortDescriptionTooltipContent'),
                contentCloning: true
            });

            $('#summernote').summernote({
                height: 150
            });
            $('#summernote').on('summernote.change', function(we, contents, $editable) {
                vm.form.referenceDoc = contents;
            });

            $('#materialType').on("change", () => {
                vm.changeMaterialType($('#materialType').val());
            });
            $('#approver').on("change", () => {
                vm.form.approverName = $('#approver').val();
            });
            $('#editDateRequested').daterangepicker({
                "singleDatePicker": true,
                "showDropdowns": true,
                "timePicker": true,
                "drops": "up",
                "applyButtonClasses": "btn-info",
                "cancelClass": "btn-secondary"
            });
            $('#editDateRequested').on('apply.daterangepicker', function(ev, picker) {
                $(this).val(picker.startDate.format('MM/DD/YYYY h:mm:ss A'));
                vm.form.dateRequested = picker.startDate.format('MM/DD/YYYY h:mm:ss A');
            });
            $('#editDateRequested').on('cancel.daterangepicker', function(ev, picker) {
                $(this).val(vm.form.dateRequested);
            });
        },
        created() {
            this.$eventBus.$on("createHeaderEvent", () => {
                this.editMode = false;
                this.form.reset();
                // Change this to the User's name
                this.requestor = 'Alexander Pierce';
                this.form.dateRequested = moment(new Date()).format('MM/DD/YYYY h:mm:ss A');
                $('#summernote').summernote('reset');
                $('#materialType').val('Please select one').change();
                $('#approver').val('Please select one').change();
                $('#editDateRequested').hide();
            });
            this.$eventBus.$on("editRequestEvent", (request) => {
                this.editMode = true;
                this.form.reset();
                // Change to user's name
                this.requestor = 'Alexander Pierce';
                this.form.id = request.creationHeaderID;
                this.form.longDescription = request.longDescription;
                this.form.shortDescription = request.shortDescription;
                this.form.mfrPartNumber = request.mfrPartNumber;
                this.form.buyPrice = request.buyPrice;
                this.form.dateRequested = request.dateRequested;
                this.form.referenceDoc = request.referenceDoc;
                $('#editDateRequested').show();
                $('#editDateRequested').val(this.form.dateRequested);
                $('#summernote').summernote('reset');
                $('#summernote').summernote('code', request.referenceDoc);
                $('#materialType').val(this.materialTypeDescription(request.materialTypeID)).change();
                $('#approver').val(this.approverName(request.materialTypeID)).change();
            });
        },
        data() {
            return {
                form: new Form({
                    id: '',
                    materialTypeValue: '',
                    longDescription: '',
                    shortDescription: '',
                    mfrPartNumber: '',
                    buyPrice: '',
                    dateRequested: '',
                    approverName: '',
                    referenceDoc: ''
                }),
                requestor: '',
                editMode: false
            }
        },
        methods: {
            ...mapActions(["getApproverOptions", "createHeader", "editHeader"]),
            changeMaterialType(materialTypeValue) {
                this.form.materialTypeValue = materialTypeValue;
                this.materialType = this.materialTypeOptions.find(option => option.value === materialTypeValue);
                this.getApproverOptions(this.materialType);
            },
            create() {
                this.createHeader(this.form);
                this.$eventBus.$emit("hideCreateHeaderModal");
            },
            edit() {
                this.editHeader(this.form);
                this.$eventBus.$emit("hideCreateHeaderModal");
            },
            materialTypeDescription(id) {
                return this.materialTypeOptions.find(materialType => materialType.id === id).value;
            },
            approverName(id) {
                return this.approverOptions.find(approver => approver.materialTypeID === id).value;
            }
        },
        computed: {
            ...mapState(["materialTypeOptions", "approverOptions"])
        }
    }
</script>

<style scoped>
    .tooltip_templates { display: none; }
</style>
