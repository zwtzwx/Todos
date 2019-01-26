<template>
  <div class="todos">
    <div class="my-todos">
      <h1>Todos</h1>
      <div><input type="text" placeholder="请输入待办事项" 
        :class="['need-todo', {'focus': getFocus}]" autofocus
        @focus="getFocus = true" @blur="getFocus = false"
        v-model="todoConent"
        @keyup.enter="addTodo">
      </div>
      <el-tabs type="card">
        <el-tab-pane label="待完成">
          <div class="todo-content"> 
            <div class="needs" v-for="(item, index) in needs.slice(needsMin, needsMin + 8)" :key="index">
              <el-checkbox v-model="item.isChecked" @change="updateTodo(index)"></el-checkbox>
              <span class="content">{{ item.content }}</span>
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination 
          layout="prev, pager, next" 
          :total="needs.length"
          :page-size="8"
          @current-change="pageChange(1, $event)"></el-pagination>
        </el-tab-pane>

        <el-tab-pane label="已完成">
          <div class="todo-content">
            <div class="already" v-for="(item, index) in alread" :key="index">
              <el-checkbox v-model="item.isChecked" disabled></el-checkbox>
              <span class="content">{{ item.content }}</span>
              <el-button type="danger" class="delete" round size="mini" @click="deleteTodo(index)">删除</el-button>
            </div>
          </div>

          <!-- 分页 -->
          <el-pagination 
          layout="prev, pager, next" 
          :total="alread.length"
          @current-change="pageChange(2, $event)"></el-pagination>
        </el-tab-pane>
      </el-tabs>

      
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

interface Todos {
  isChecked: boolean,
  content: string
}
const local = window.localStorage
@Component
export default class MyTodos extends Vue{

  // data
  getFocus: boolean = true;
  needs: Todos[] = [];
  alread: Todos[] = [];
  todoConent: string = '';

  // 分页开始值和结束值
  needsMin: number = 0;
  alreadyMin: number = 0;
  
  // methods
    // 添加待办事项
  addTodo():void {
    if (this.todoConent) {
      this.needs.push({
        isChecked: false,
        content: this.todoConent
      });
      this.$message({
        message: '添加成功',
        type: 'success'
      })
      this.todoConent = ''
    }
  }
  updateTodo(index: number) {
    // 从待完成到已完成
    this.alread.push(this.needs[index])
    this.needs = (this.needs.slice(0, index)).concat(this.needs.slice(index + 1))
  }
  // 删除便签
  deleteTodo(index: number) {
    this.alread = (this.alread.slice(0, index)).concat(this.alread.slice(index + 1))
  }
  pageChange(item: number, page: number) {
    // 待完成的分页
    if (item === 1) {
      
      this.needsMin = (page - 1) * 8;
      console.log(this.needsMin);
      
    } else if (item === 2) {
      this.alreadyMin = (page - 1) * 8;
    }
  } 
}
</script>
<style lang="scss" scoped>
$boder-color: #999;
.todos {
  width: 500px;
  min-height: 600px;
  background-color: #fff;
  text-align: center;
  margin: 0 auto;
  margin-top: 100px;
  .my-todos {
    width: 80%;
    margin: 0 auto;
  }
  .need-todo {
    outline: none;
    border: none;
    height: 30px;
    width: 100%;
    border-bottom: 1px solid $boder-color;
    padding: 3px;
    font-size: 14px;
    margin-bottom: 20px;
    box-sizing: border-box;
  }
  .focus {
    border-color: #409EFF;
  }
  .needs, .already {
   
    margin-top: 15px;
    text-align: left;
    border-bottom: 1px solid #666;
    padding: 3px;
    padding-bottom: 7px;
  }
  .already  {
    color: $boder-color;
    text-decoration: line-through;
    border-color: $boder-color;
  }
  .content {
    padding-left: 10px;
  }
  .delete {
    float: right;
  }
  .todo-content {
    height: 400px;
    overflow: hidden;
  }
}

</style>

