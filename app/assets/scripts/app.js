import Person from './modules/Person';
var $ = require('jquery');
import Vue from 'vue';

class Adult extends Person {
 payTaxes() {
     console.log(this.name + " now owes $0 in taxes.")
 }
}

var john = new Adult("John Doe", "orange");
john.greet();
john.payTaxes();

// $("h1").remove();
// $("h2").remove();

var app = new Vue({
   el: "#testimonials",
   data: {
       message: "Howdy"
   } 
});