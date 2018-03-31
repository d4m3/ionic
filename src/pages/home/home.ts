import { Component } from '@angular/core';
import { NavController, AlertController, reorderArray, ToastController } from 'ionic-angular';
import { TodoProvider } from '../../providers/todo/todo';
import { ArchivedTodosPage } from '../../pages/archived-todos/archived-todos';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public todos = [];
  public reoderIsEnabled = false;
  public archivedTodosPage = ArchivedTodosPage;
  
  constructor(public toastController: ToastController, public navCtrl: NavController, private alertController: AlertController, private todoService: TodoProvider) {
    this.todos = this.todoService.getTodos();
  }

  archiveTodo(todoIndex){
    this.todoService.archiveTodo(todoIndex);
  }
  /*
   Used declarative way with public public archivedTodosPage = ArchivedTodosPage;
   But, the function below can be used to call other fuction/proces if needed
  */
  goToArchivePage(){
    this.navCtrl.push(ArchivedTodosPage);
  }

  toggleReorder(){
    this.reoderIsEnabled = !this.reoderIsEnabled;
  }
  
  itemReordered($event){
    reorderArray(this.todos, $event);
  }

  editTodo(todoIndex)
  {
    let editTodoAlert = this.alertController.create({
      title:"Edit A Todo",
      message: "Enter your Todo Edit",
      inputs: [
        {
          type:"text",
          name: "editTodoInput",
          value: this.todos[todoIndex] // preset this value
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Edit Todo",
          handler: (inputData)=> {
            let todoText;
            todoText = inputData.editTodoInput;            
            this.todoService.editTodo(todoText, todoIndex);

            editTodoAlert.onDidDismiss(()=>{                        
              let editTodoToast = this.toastController.create({
                  message: "Todo Edited",
                  duration: 2000
                });
                editTodoToast.present();
              });           
          }
        }
      ]
    });
    editTodoAlert.present();
  }

  // Create call to capture info when calling the + on the app
  // Create buttons to cancel, and add text into the Todo list
  // present is used to show Alert
  openTodoAlert(){
    let addTodoAlert = this.alertController.create({
      title:"Add A Todo",
      message: "Enter your Todo",
      inputs: [
        {
          type:"text",
          name: "addTodoInput"
        }
      ],
      buttons:[
        {
          text: "Cancel"
        },
        {
          text: "Add",
          handler:(inputData)=>{
            let todoText;
            todoText = inputData.addTodoInput;            
            this.todoService.addTodo(todoText);

            addTodoAlert.onDidDismiss(()=>{
            
            // Notification of adding a todo
            let addTodoToast = this.toastController.create({
                message: "Todo Added",
                duration: 2000
              });
              addTodoToast.present();
            });           
          }
        }
      ]
    });
    addTodoAlert.present();
  }

}
