<template>
  <div>
    <v-sheet rounded class="m-3 views text-center mt-10" min-width="500px">
      <v-data-table-server
        v-model:items-per-page="recordsPerPage"
        :headers="headers"
        :items="records"
        :items-length="totalNumberOfRecords"
        :loading="loadingTable"
        :search="details.search"
        item-value="id"
        loading-text="Loading, please wait."
        no-data-text="There are no records with this configuration"
        @update:options="getRecords"
      >
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="openDeleteDialog(item)"> fas fa-user-edit </v-icon>
        </template>
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field
                v-model="details.search"
                class="ma-2"
                density="compact"
                placeholder="Search result..."
                hide-details
              ></v-text-field>
            </td>
            <td>
              <v-select
                v-model="details.operationType"
                :items="operationTypes"
                item.value="value"
                class="ma-2"
                density="compact"
                label="Filter by Operation"
                hide-details
              ></v-select>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-sheet>
    <v-dialog>
      <template>
        <v-card>
          <v-card-title class="mx-4 texto1rem"
            >Are you sure you want to delete this record?</v-card-title
          >
          <v-row class="mx-6 mt-4 text-center pb-4 mb-0">
            <v-col>
              <v-btn color="#007e54" @click="this.deleteDialog = false" class="ml-8 mr-12" outlined>
                Close
              </v-btn>
              <v-btn color="#BEA55F" @click="deleteRecord" class="ml-8 mr-12">
                <v-progress-circular
                  indeterminate
                  color="danger"
                  v-if="loaderDelete"
                ></v-progress-circular>
                <span v-if="!loaderDelete">Delete</span>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>
<script>
import { getUserRecords, deleteUserRecord } from '@/services/recordsService'
export default {
  setup() {},
  data() {
    return {
      records: [],
      totalNumberOfRecords: null,
      recordsPerPage: 10,
      recordToDelete: null,
      deleteDialog: false,
      details: {
        pageNumber: null,
        pageItemCount: null,
        sortBy: null,
        direction: null,
        search: null,
        operationType: null
      },
      loadingTable: true,
      loadingDelete: true,
      headers: [
        {
          title: 'Operation',
          align: 'center',
          sortable: true,
          key: 'operation'
        },
        {
          title: 'Cost',
          align: 'center',
          sortable: true,
          key: 'amount'
        },
        {
          title: 'Balance After',
          align: 'center',
          sortable: false,
          key: 'userBalance'
        },
        {
          title: 'Date',
          align: 'center',
          sortable: true,
          key: 'date'
        },
        {
          title: 'Actions',
          align: 'center',
          key: 'actions'
        }
      ],
      operationTypes: [
        { value: 1, desc: 'Addiction' },
        { value: 2, desc: 'Subtraction' },
        { value: 3, desc: 'Division' },
        { value: 4, desc: 'Multiplication' },
        { value: 5, desc: 'Square Root' },
        { value: 6, desc: 'String Generation' },
        { value: 7, desc: 'Credits Added' }
      ]
    }
  },
  methods: {
    async getRecords(table) {
      console.log('Table', [table, table.itemsPerPage, table.sortBy])
      this.loadingTable = true
      console.log('Details', this.details)
      return
      //   await getUserRecords(this.details)
      //     .then((response) => {
      //       console.log('Pageable', response.data)
      //      // this.records = response.data
      //     })
      //     .finally(() => (this.loadingTable = false))
    },
    async deleteRecord() {
      let id = this.recordToDelete.id
      this.loadingDelete = true
      await deleteUserRecord(id)
        .then(() => this.getRecords())
        .finally((this.loadingDelete = false))
    },
    openDeleteDialog(record) {
      this.recordToDelete = record
      this.deleteDialog = true
    }
  }
}
</script>
