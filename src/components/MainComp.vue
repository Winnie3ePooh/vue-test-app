<template lang="pug">
  .container
    .row.input-block
      .block.center
        input(type="text", id="userID", placeholder="User ID", v-model.number="userID", @keyup.enter="fetchUserData")
        no-ssr
          date-picker(v-model="time2", :not-after="new Date()", range, :shortcuts="shortcuts", lang="ru")
        div(v-show="!userID")
          warning
        .warning
          warning(v-show="msg.seen",:message="msg.msg")
    .row(v-show="seen")
      .data-table
        report(:date="date", :visits="visits", :pays="pays", :regs="regs")
      #canvas-holder.canvas-holder
        canvas#chart-area
</template>

<script>
  import chart from 'chart.js'
  import NoSSR from 'vue-no-ssr'
  import vue2datepicker from 'vue2-datepicker'
  import Warning from './Warning.vue'
  import Report from './Report.vue'

  export default {
    name: "main-comp",
    components: {
      Report,
      Warning,
      'no-ssr': NoSSR,
      'date-picker': vue2datepicker,
    },
    data() {
      return {
        seen: false,
        userID: '',
        date: [],
        pays: [],
        visits: [],
        regs: [],
        time2: '',
        graph: null,
        msg: {},
        timeout: null,
        shortcuts: [
          {
            text: 'Today',
            start: new Date(),
            end: new Date(),
          }
        ],
      }
    },
    mounted() {
      this.seen = false
    },
    methods: {
      isNumber() {
        return (this.userID === parseInt(this.userID, 10))? true:false
      },
      moneyFormatter(el) {
        return new Intl.NumberFormat('ru').format(el)
      },
      renderStats(el) {
        let ctx = document.getElementById('chart-area').getContext('2d')
        if(this.graph !== null) {
          console.log('зашёл')
          this.graph.destroy()
        }
        let tempData = {
          type: 'line',
          data: {
            labels: el.date.map(function(item){return item}),
            datasets: [
              {
                label: 'Переходы',
                yAxisID: 'B',
                data: el.visits.map(function(item){return item.event_count}),
                borderColor: '#808080',
              },
              {
                label: 'Регистрации',
                yAxisID: 'B',
                data: el.regs.map(function(item){return item.event_count}),
                borderColor: '#A52A2A',
              },
              {
                label: 'Доходы',
                yAxisID: 'A',
                data: el.pays.map(function(item){return item.event_val}),
                borderColor: '#808000',
              }
            ]
          },
          options: {
            responsive: true,
            scales: {
              yAxes: [{
                id: 'A',
                type: 'linear',
                position: 'left',
                ticks: {
                  callback: function(value) {
                    return new Intl.NumberFormat('ru').format(value) + ' ₽'
                  }
                }
              }, {
                id: 'B',
                type: 'linear',
                position: 'right',
                ticks: {
                  min: 0
                }
              }]
            },
          }
        }
        this.graph = new Chart(ctx, tempData)
      },
      fetchUserData() {
        this.$http.post('/data/', {userID: this.userID, dateRange: this.time2}).then(resp => {
          console.log(resp.body)
          this.seen = true
          this.renderStats(resp.body)
          this.date = resp.body.date
          this.visits = resp.body.visits
          this.pays = resp.body.pays
          this.regs = resp.body.regs
          this.msg.seen = false
         }, resp => {
          this.seen = false
          this.msg = { msg: 'Что-то пошло не так.', seen: true }
        })
      },
    },
    watch: {
      userID() {
        clearTimeout(this.timeout)
        if(this.userID !== '' && this.isNumber()){
          this.timeout = setTimeout(
            this.fetchUserData()
            , 1000)
        }
        else {
          this.msg.seen = (this.userID === '')? false:true
          this.msg.msg = 'Только числа.'
        };
      },
      time2() {
        clearTimeout(this.timeout)
        if(this.userID !== '') {
          this.timeout = setTimeout(
            this.fetchUserData()
            , 1000);
        }
        else { this.msg.seen = false }
      }
    },
  }
</script>

<style lang="scss">
  .container {
    width: 1200px;
    margin: 0 auto;
  }
  .row {
    width: 100%;
    display: flex;
    justify-content: space-between;
  }
  .row.input-block{
    margin: 20px 0;
  }
  .input-block input {
    height: 34px;
    margin-right: 10px;
    margin-left: -10px;
    line-height: 1.4;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .75);
    -moz-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .75);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .75);
  }
  .input-block input[type=text] {
    width: 200px;
    padding: 10px 12px;
    box-sizing: border-box;
  }
  .mx-datepicker {
    min-width: 20px !important;
    width: 20px !important;
  }
  .mx-input-icon {
    right: -6px !important;
  }
  .block{
    display: inline;
    text-align: center;
  }
  .center {
    margin:auto;
  }
  .canvas-holder{
    width: 45%;
  }
  .data-table {
    width: 50%;
    height: 300px;
    overflow-y: scroll;
  }
  .warning {
    display: flex;
    justify-content: center;
  }
</style>
