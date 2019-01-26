<template>
  <div>
    <transition name="todo">
      <h1 v-show="show" class="title" @click="goTodos">Todos</h1>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Home extends Vue{
  show: boolean = false;
  mounted () {
    this.show = true;
  }
  goTodos() {
    this.$router.push('todos');
  }
}
</script>
<style lang="scss" scoped>

@keyframes bounce-in {
  0% {
    transform: rotate(90deg);
    transform: translateY(10px);
  }
  50% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

.todo-enter-active {
  animation: bounce-in .5s;
}
.todo-leave-active {
  animation: bounce-in .5s reverse;
}
.title {
  color: #fff;
  font-size: 100px;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  text-shadow: lightcyan 3px 5px ;
  cursor: pointer;
  margin-top: 300px;
}
</style>


