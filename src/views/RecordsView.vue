<template>
  <div>
    <v-sheet rounded class="m-3 views text-center mt-10" min-width="700px">
      <v-data-table-server
        v-model:items-per-page="recordsPerPage"
        :headers="headers"
        :items="records"
        :items-length="totalNumberOfRecords"
        :loading="loadingTable"
        :search="search"
        item-value="id"
        loading-text="Loading, please wait."
        no-data-text="There are no records with this configuration"
        @update:options="getRecords"
      >
        <template v-slot:[`item.date`]="{ item }">
          <span>{{
            new Date(item.date).toLocaleDateString() +
            ' - ' +
            new Date(item.date).toLocaleTimeString()
          }}</span>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon small @click="openDeleteDialog(item)" icon="mdi-delete">mdi-delete</v-icon>
        </template>
        <template v-slot:tfoot>
          <tr>
            <td>
              <v-text-field
                v-model="searchResult"
                class="ma-2"
                density="compact"
                placeholder="Search result..."
                hide-details
              ></v-text-field>
            </td>
            <td>
              <v-select
                v-model="operationType"
                :items="operationTypes"
                item.value="value"
                item-title="desc"
                class="ma-2"
                density="compact"
                label="Filter by Operation"
                clearable
                hide-details
              ></v-select>
            </td>
          </tr>
        </template>
      </v-data-table-server>
    </v-sheet>
    <v-dialog v-model="deleteDialog" width="500px">
      <v-card>
        <v-card-title class="mx-4 texto1rem"
          >Are you sure you want to delete this record?</v-card-title
        >
        <v-row class="mx-6 mt-4 text-center pb-4 mb-0">
          <v-col>
            <v-btn color="#5a5b5b" @click="this.deleteDialog = false" class="ml-8 mr-12" outlined>
              Close
            </v-btn>
            <v-btn color="#007e54" @click="deleteRecord" class="ml-8 mr-12" filled>
              <v-progress-circular
                indeterminate
                color="danger"
                v-if="loadingDelete"
              ></v-progress-circular>
              <span v-if="!loadingDelete">Delete</span>
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
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
      totalNumberOfRecords: 0,
      recordsPerPage: 10,
      recordToDelete: null,
      deleteDialog: false,
      operationType: null,
      searchResult: null,
      details: {
        pageNumber: null,
        pageItemCount: null,
        sortBy: null,
        sortDirection: null,
        searchResult: null,
        operationType: null
      },
      loadingTable: false,
      loadingDelete: false,
      search: '',
      headers: [
        {
          title: 'Operation',
          align: 'center',
          sortable: false,
          key: 'operation'
        },
        {
          title: 'Result',
          align: 'center',
          sortable: true,
          key: 'result'
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
          key: 'actions',
          sortable: false
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
      this.loadingTable = true
      console.log('Table', table)
      if (table != null) {
        this.details.pageItemCount = table.itemsPerPage
        this.details.pageNumber = table.page - 1
        this.details.operationType = this.operationType
        this.details.searchResult = this.searchResult
        if (table.sortBy.length > 0) {
          this.details.sortBy = table.sortBy[0].key
          this.details.sortDirection = table.sortBy[0].order
        }
      }

      await getUserRecords(this.details)
        .then((response) => {
          this.totalNumberOfRecords = response.data.totalElements
          this.records = response.data.content
          console.log('Records', this.records)
        })
        .finally(() => (this.loadingTable = false))
    },
    async deleteRecord() {
      let id = this.recordToDelete.id
      this.loadingDelete = true
      await deleteUserRecord(id)
        .then(() => this.getRecords())
        .finally(() => {
          this.loadingDelete = false
          this.deleteDialog = false
        })
    },
    openDeleteDialog(record) {
      this.recordToDelete = record
      this.deleteDialog = true
    }
  },
  watch: {
    operationType() {
      this.search = String(Date.now())
    },
    searchResult() {
      this.search = String(Date.now())
    }
  }
}
</script>
