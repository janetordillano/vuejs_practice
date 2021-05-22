<template>
  <div class="home">
	<div class="row">
		<div class="small-12 text-center">
			<h3>Work Logger</h3>
      <h5>Log your time below:</h5>
		</div>
	</div>
	<div class="row align-center">
		<div class="small-12 medium-7 columns">
			<table class="main-table">
          <!-- Headers -->
          <tr>
            <th>Duration</th>
            <th>Project</th>
            <th>Remarks</th>
          </tr>
				<transition-group name="fade" mode="out-in" tag="tbody">
					<tr v-for="log in logs" :key="log.createdAt">
            <template v-if="!log.isEditing">
              <td width="50%" v-text="log.duration" class="line"></td>
              <td width="50%" v-text="log.project" class="line"></td>
              <td width="50%" v-text="log.remarks" class="line"></td>
              <button @click="showEditForm(log)" type="button" class="button info btn-lg btn-block" width="10%">
                Edit
              </button>
              <button @click.prevent="deleteLog(log)" type="button" class="button warning btn-lg btn-block" width="10%">
                Delete
              </button>
            </template>
            <template v-else-if="log.isEditing">
              <td> <input id="durationTextEdit" type="text" v-model="log.duration"/> </td>
              <td> <select v-model="log.project" width="50%">
                <option disabled v-text="log.project" ></option>
                <option value = "Hydra">Hydra</option>
                <option value = "Dragon MY">Dragon MY</option>
                <option value = "Dragon P2P">Dragon P2P</option>
              </select> </td>
              <td> <input id="remarksTextEdit" type="text" v-model="log.remarks"/> </td>
              <td width="10%" class="text-right">
                <button @click="saveLogUpdates(log)" type="button" class="button info btn-lg btn-block">Save</button>
						  </td>
						  <td width="10%" class="text-right">
                <button @click="hideEditForm(log)" type="button" class="button warning btn-lg btn-block">Cancel</button>
						  </td>
            </template>
					</tr>
				</transition-group>
			</table>
		</div>
	</div>
  <!-- Add log -->
    <div class="row align-center">
		<div class="small-12 medium-7 columns">
			<table class="main-table">
				<tr>
          <td> <input id="durationName" type="text" v-model="duration" placeholder="Duration" width="50%"/> </td>
          <td> <select v-model="project" width="50%">
            <option disabled value="">Project</option>
            <option value = "Hydra">Hydra</option>
            <option value = "Dragon MY">Dragon MY</option>
            <option value = "Dragon P2P">Dragon P2P</option>
          </select> </td>
          <td> <input id="remarksText" type="text" v-model="remarks" placeholder="Remarks" width="50%"/> </td>
          <button @click="addLog()" type="button" class="button success btn-lg btn-block" width="20%"> Add </button>
        </tr>
      </table>
    </div>
    </div>
<!-- Log List -->
    <div class="row align-center">
		<div class="small-12 medium-7 columns">
			<table class="main-table">
          <tr v-for="log in filterLogs(log)" v-bind:key="log.createdAt">
          <td width="50%" v-text="log.duration" class="line"></td>
          <td width="50%" v-text="log.project" class="line"></td>
        </tr>
      </table>
    </div>
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Log from "../models/Log";

export default defineComponent({
	name: "Home",
	data() {
		return {
			logs: [] as Log[],
			duration: "",
			project: "",
			remarks: ""
		};
	},
	methods: {
		setTaskComplete(log: Log): void {
			this.$store.commit("completeTask", log);
		},
		deleteLog(log: Log) {
		  console.log(log)
			this.$store.commit("deleteLog", log);
		},
		addLog(): void {
			if (this.duration !== "" && this.remarks !== "" && this.project !== "") {
				const newLog = new Log(this.duration, this.project, this.remarks);
				this.$store.commit("addLog", newLog);
				this.duration = "";
				this.project = "";
				this.remarks = "";
				// this.$router.push("/");
			}
		},
    showEditForm(log: Log): void{
		  console.log(log)
      this.$store.commit("showEditForm", log);
    },
    hideEditForm(log: Log): void{
      this.$store.commit("hideEditForm", log);
    },
    saveLogUpdates(log: Log): void{
      // if (this.duration !== "" && this.remarks !== "") {
				const newLog = new Log(this.duration, this.project, this.remarks);
				this.$store.commit("saveLogUpdates", newLog);
				this.duration = "";
				this.project = "";
				this.remarks = "";
				// this.$router.push("/");
      // }
		},
    filterLogs(log: Log){
      console.log("filterLogs")
    }
	},
	mounted() {
		this.logs = this.$store.state.logs;
	}
});

</script>

<style lang="scss" scoped>
.home {
    margin-top: 2rem;
    h4 {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      margin: 2rem 0;
    }
    tbody {
      background-color: #8080800d;
    }
    th {
      font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #0b0a0a;
    }
  }
</style>
