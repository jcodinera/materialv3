import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import moment from 'moment'

Vue.use(Vuex);
axios.defaults.baseURL = "http://192.168.15.17:80/api";

export const store =new Vuex.Store({
    state: {
        headers: [
            {
                creationHeaderID: 1,
                materialTypeID: 1,
                shortDescription: 'Etiam porta sem malesuada magna mollis euismod.',
                longDescription: 'Etiam porta sem malesuada magna mollis euismod.',
                mfrPartNumber: '11111-2222222',
                buyPrice: '542315.00',
                referenceDoc: '<p>Hello</p>',
                statusID: null,
                creatorID: null,
                dateRequested: moment(new Date()).format('MM/DD/YYYY h:mm:ss A'),
                dateCreated: moment(new Date()).format('MM/DD/YYYY h:mm:ss A'),
                dateModified: moment(new Date()).format('MM/DD/YYYY h:mm:ss A'),
            }
        ],
        matGrp1Options: [
            {id: 1, value: 'Value 1'},
            {id: 2, value: 'Value 2'},
            {id: 3, value: 'Value 3'},
        ],
        matGrp2Options: [
            {id: 1, matGrp1ID: 1, value: 'Value 1'},
            {id: 1, matGrp1ID: 2, value: 'Value 2'},
            {id: 1, matGrp1ID: 3, value: 'Value 3'},
        ],
        matGrp3Options: [
            {id: 1, matGrp2ID: 1, value: 'Value 1'},
            {id: 1, matGrp2ID: 2, value: 'Value 2'},
            {id: 1, matGrp2ID: 3, value: 'Value 3'},
        ],
        materialTypeOptions: [
            {id: 1, value: 'Value 1'},
            {id: 2, value: 'Value 2'},
            {id: 3, value: 'Value 3'},
        ],
        approverOptions: [
            {id: 1, materialTypeID: 1, value: 'Value 1'},
            {id: 2, materialTypeID: 2, value: 'Value 2'},
            {id: 3, materialTypeID: 3, value: 'Value 3'},
        ],
        materials: [
            {
                matHeaderID: 0,
                creationHeaderID: 1,
                warrantyID: 0,
                matGrp1: 'Value 1',
                matGrp2: 'Value 2',
                matGrp3: 'Value 3',
                remarks: '',
                approved: false
            }
        ]
    },
    mutations: {
        getMaterialTypeOptions(state, options) {
            state.materialTypeOptions = options;
        },
        getMaterialGroup2Options(state, matGrp2Options) {
            state.matGrp2Options = matGrp2Options;
        },
        getMaterialGroup3Options(state, matGrp3Options) {
            state.matGrp3Options = matGrp3Options;
        },
        getApproverOptions(state, approverOptions) {
            state.approverOptions = approverOptions;
        },
        createHeader(state, header) {
            // Create header
            state.headers.push({
                creationHeaderID: state.headers.length + 1,
                materialTypeID: state.materialTypeOptions.find(materialType => materialType.value === header.materialTypeValue).id,
                shortDescription: header.shortDescription,
                longDescription: header.longDescription,
                mfrPartNumber: header.mfrPartNumber,
                buyPrice: header.buyPrice,
                referenceDoc: header.referenceDoc,
                statusID: null,
                creatorID: null,
                dateRequested: header.dateRequested,
                dateCreated: header.dateRequested,
                dateModified: header.dateRequested
            });
        },
        editHeader(state, header) {
            const oldHeader = state.headers.find(oldHeader => oldHeader.creationHeaderID === header.id);
            const index = state.headers.findIndex(item => item.creationHeaderID === oldHeader.creationHeaderID);
            const editedHeader = {
                creationHeaderID: header.id,
                materialTypeID: state.materialTypeOptions.find(materialType => materialType.value === header.materialTypeValue).id,
                shortDescription: header.shortDescription,
                longDescription: header.longDescription,
                mfrPartNumber: header.mfrPartNumber,
                buyPrice: header.buyPrice,
                referenceDoc: header.referenceDoc,
                statusID: null,
                creatorID: null,
                dateRequested: header.dateRequested,
                dateCreated: oldHeader.dateCreated,
                dateModified: moment(new Date()).format('MM/DD/YYYY h:mm:ss A')
            };
            state.headers.splice(index, 1, editedHeader);
        }
    },
    actions: {
        getMaterialTypeOptions(context) {
            // This method uses axios to get all Material Types
            axios.get("/material-types")
                .then(response => {
                    context.commit("getMaterialTypeOptions", response.data);
                })
                .catch(error => alert(error));
        },
        getMaterialGroup2Options(context, materialGroup1) {
            // This method get all Material Group 2 options based from Material Group 1 id using axios GET headers
            // axios.get("/get-material-group2-options", {params: {grp1ID: materialGroup1.id}})
            //     .then(response => {
            //         console.log(response.data);
            //         context.commit("getMaterialGroup2Options", response.data);
            //     }).catch(error => alert(error));
        },
        getMaterialGroup3Options(context, materialGroup2) {
            // This method get all Material Group 3 options based from Material Group 2 id using axios GET headers
            // axios.get("/get-material-group3-options", {params: {grp2ID: materialGroup2.id}})
            //     .then(response => {
            //         console.log(response.data);
            //         context.commit("getMaterialGroup3Options", response.data);
            //     }).catch(error => alert(error));
        },
        getApproverOptions(context, materialType) {
            // This method get all Approvers options based on Material Type
            // axios.get("/get-approver-options", {params: {materialTypeID: materialType.id}})
            //     .then(response => {
            //         console.log(response.data);
            //         context.commit("getApproverOptions", response.data);
            //     })
            //     .catch(error => alert(error));
        },
        createHeader(context, header) {
            // Use axios to post header
            // axios.post("/headers", header)
            //     .then(response => {
            //         context.commit("createHeader", response.data);
            //     });

            // Delete this line if you're gonna use axios
            context.commit("createHeader", header);
        },
        editHeader(context, header) {
            // Use axios to do PUT request
            // axios.put("/headers", {params: {creationHeaderID: header.creationHeaderID}})
            //     .then(response => {
            //         context.commit("editHeader", response.data);
            //     })
            //     .catch(error => alert(error));

            // Delete this line if you're gonna use axios
            context.commit("editHeader", header);
        },
        removeHeader() {
            // This method is to delete header
        }
    }
});
