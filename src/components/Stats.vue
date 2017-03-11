<template>
  <div>
    <bar-chart
      :chartData="workoutStatistics"
      :options="{responsive: true, maintainAspectRatio: true}"
      :width="400"
      :height="150"/>
    <ul class="stats">
      <li v-for="(year, yearKey) in groupedWorkouts">
        <ul>
          <li v-for="(month, monthKey) in year">
            <div class="title">{{ yearKey }}-{{ monthKey }}</div>
            <ul class="workouts">
              <li class="workout" v-for="workout in month">
                <div class="date">{{ workout.timepoint.datetime }}</div>
                <div class="name">{{ workout.name || 'Eget pass' }}</div>
              </li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
import GET_WORKOUTS from '@/queries/getWorkouts.graphql'
import BarChart from '@/components/BarChart'
import { groupedWorkouts, workoutStatistics } from '@/utils/helpers'

export default {
  name: 'stats',
  data () {
    return {
      workouts: []
    }
  },
  apollo: {
    workouts: {
      query: GET_WORKOUTS
    }
  },
  components: {
    BarChart
  },
  computed: {
    groupedWorkouts () {
      return groupedWorkouts(this.workouts)
    },
     workoutStatistics () {
      const datasets = workoutStatistics(this.workouts)

      return {
        labels: ['Januari', 'Februari', 'Mars', 'April', 'Maj', 'Juni', 'Juli', 'Augusti', 'September', 'Oktober', 'November', 'December'],
        datasets
      }
     }
  }
}
</script>

<style scoped>
  .title {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 20px;
  }

  .stats {
    margin-top: 40px;
  }

  .workouts {
    margin-bottom: 20px;
  }

  .workout {
    border-bottom: 1px solid #efefef;
    display: grid;
    grid-template-columns: 150px 1fr;
    padding: 10px;
    transition: opacity 200ms, transform 300ms;
  }

  .date {
    color: rgba(36, 41, 46, 0.6);
    font-size: 14px;
  }

  .name {
    font-weight: 600;
  }
</style>
