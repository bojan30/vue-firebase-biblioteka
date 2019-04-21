<template>
  <div>
    <Nav/>
    <router-view style="animation-duration: 0.5s"/>
  </div>
</template>

<script>
import Nav from '@/components/Nav'
export default {
  name: 'App',
  components: {
    Nav
  }
}
</script>

<style>
/*animate css*/
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.7.0/animate.min.css');
/*font*/
@import url('https://fonts.googleapis.com/css?family=Poppins');
/* @import url('https://fonts.googleapis.com/css?family=Roboto'); */

/*colors*/
:root{
  --primary: #428bca; 
  /* --primary: #83b799;   */
  --secondary: #f7f7f7;
  --success: #43ac6a;
  --danger: #d9534f;
  --text-color: #666666;
  --border-radius: 5px;
  --shadow: 0px 0px 3px 0px rgba(0,0,0,0.7);
  --form-shadow: 0px 0px 20px 0px rgba(0,0,0,0.2);
  --shadow-hover: 0px 15px 10px -12px rgba(0,0,0,0.7);
}

/*reset*/

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
input,button{
  outline: none;
  border: none;
}
a{
  text-decoration: none;
}
ul{
  list-style-type: none;
}
input{
  display: block;
}

/*global*/
body{
  font-family: 'Poppins';
  line-height: 1.6;
  min-height: 100vh;
  color: var(--text-color);
  background-color: var(--secondary);
}
.container{
  width: 90%;
  margin: auto;
  padding: 20px 0;
  min-height: calc(100vh - 60px);
}

.btn{
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  background-color: var(--primary);
  color: #fff;
  border-radius: var(--border-radius);
  transition: all 0.1s linear;
  text-transform: uppercase;
  cursor: pointer;
}

.btn:hover{
  box-shadow: var(--shadow-hover);
  transform: translateY(-2px);
}

/*nav*/
.nav{
  height: 60px;
  background-color: var(--primary);
  display: flex;
  padding: 0 5%;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
}
.logo a{
  color: #fff;
  font-size: 20px;
}
.logo .fa-book{
  margin-right: 10px;
}
.navbar{
  display: flex;
}
.nav-item.username{
  color: #fff;
  margin-right: 10px;
}
.nav-item.username .fa-user{
  margin-right: 5px;
}
.nav-link{
  color: #ddd;
  padding: 10px 14px;
}
.router-link-exact-active{
  color: #fff;
}
/*form*/
.form-wrapper{
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 60px);
  padding: 0px 5%;
  overflow-y: scroll;
  /* background-color: #fff; */
}

.form{
  width: 100%;
  padding: 40px;
  box-shadow: var(--form-shadow);
  border-radius: var(--border-radius);
  background-color: #fff;
  max-width: 400px;
}
.form-group{
  margin-bottom: 20px;
}
.form-link{
  text-decoration: underline;
  color: var(--text-color);
  display: inline-block;
  margin-bottom: 20px;
}
.form h3{
  text-align: center;
}

input{
   width: 100%;
  margin-top: 5px;
  box-shadow: var(--shadow);
  border-radius: var(--border-radius);
  height: 30px;
  padding-left: 30px;
  font-size: 16px;
  color: var(--main-text-color);
  transition: padding 0.1s linear;
}

.input-wrapper{
  position: relative;
}
.input-wrapper::before{
  font-family: 'Font Awesome 5 Free';
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 6px;
  transform: translateY(-50%);
  transition: transform 0.1s linear;
}

.input-wrapper.email::before{
  content: "\f2b6";
}
.input-wrapper.password::before{
  content: "\f13e";
}
.input-wrapper.username::before{
  content: "\f007";
}
.input-wrapper.search::before{
  content: "\f002";
}
.input-wrapper.write::before{
  content: "\f303";
}
.btn-login,.btn-register{
  width: 100%;
}

/*book table*/

.books-wrapper{
  margin-top: 20px;
}

.book-wrapper h3{
  margin-bottom: 20px;
}

#table{
  width: 100%;
  text-align: left;
  margin-top: 20px;
  /* border-collapse: collapse; */
}

#table thead th{
  /* box-shadow: 0px 0px 1px 0px var(--main-text-color); */
  border-radius: var(--border-radius);
  background-color: var(--primary);
  color: #fff;
}

#table td{
  padding: 5px 10px;
  /* box-shadow: var(--shadow); */
  border: 1px solid #999;
  /* box-shadow: 0px 0px 1px var(--main-text-color); */
  border-radius: var(--border-radius);
}
#table thead th{
  padding: 5px 10px;
}
#table tbody tr:nth-child(odd){
  background-color: var(--secondary);
}

#table tbody tr:nth-child(even){
  background-color: #fff;
}

/*modify buttons*/
.edit,.delete{
  padding: 8px;
  border-radius: var(--border-radius);
  color: #fff;
  cursor: pointer;
}
.edit{
  background-color: var(--success);
  position: relative;
}
.delete{
  background-color: var(--danger);
  margin-left: 10px;
  position: relative;
}
.fa-pencil-alt, .fa-trash{
  pointer-events: none;
}
.edit:hover .tooltip,.delete:hover .tooltip{
  display: block;
}
.edit .tooltip, .delete .tooltip{
  position: absolute;
  top: 125%;
  left: 0%;
  background-color: #fff;
  /* text-align: center; */
  color: #555;
  padding: 5px 10px;
  border-radius: var(--border-radius);
  display: none;
  z-index: 2;
  border: 1px solid #555;
}

.edit .tooltip::before, .delete .tooltip::before{
  content: '';
  position: absolute;
  top: -4px;
  left: 10px;
  height: 6px;
  width: 6px;
  border-top: 1px solid #555;
  border-left: 1px solid #555;
  background-color: #fff;
  transform: rotate(45deg);
  border-radius: 2px;
}
.add-book{
  margin-bottom: 20px;
}
.btn-add .fa-plus{
  margin-right: 10px;
}

/*custom scrollbar*/

::-webkit-scrollbar{
  width: 10px;
  background-color: var(--secondary);
}

::-webkit-scrollbar-thumb{
  background-color: #888;
  border-radius: 4px;
}

.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
}
.modal .form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.fa-times{
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
  padding: 10px;
  color: var(--text-color);
}

/*media*/

@media(max-width: 568px){
  .form{
    width: 100%;
  }
  body{
    font-size: 10px;
  }
}

/*feedback message styles*/
.feedback{
  background-color: var(--danger);
  padding: 5px; 
  color: #fff;
  border-radius: var(--border-radius);
  margin-bottom: 10px;
}

.confirm{
  background-color: var(--danger);
}
.cancel{
  background-color: var(--secondary);
  color: #333;
  border: 1px solid #333;
}

.delete-modal-buttons{
  display: flex;
  justify-content: space-between;
}
</style>