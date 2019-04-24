<template>
  <div>
    <Nav/>
    <transition name="router-animation" mode = "out-in"       enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <router-view style="animation-duration: 0.5s"/>
    </transition>
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
  --blue: #33b5e5;
  --grey: #f7f7f7;
  --green: #43ac6a;
  --red: #d9534f;
  --text-color: #666666;
  --border-radius: 5px;
  --shadow: 0px 0px 2px 0px rgba(0,0,0,0.7);
  --form-shadow: 0px 0px 15px 1px rgba(0,0,0,0.2);
  --shadow-hover: 0px 15px 10px -12px rgba(0,0,0,0.7);
  --shadow-focus: 0px 0px 4px 0px rgba(0,0,0,0.7);
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
  background-color: var(--grey);
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
  background-color: var(--blue);
  color: #fff;
  border-radius: var(--border-radius);
  transition: all 0.1s linear;
  text-transform: uppercase;
  cursor: pointer;
}

.btn:hover{
  box-shadow: var(--shadow-hover);
  transform: translateY(-1px);
  background-color: #0099cc;
}

/*nav*/
.nav{
  height: 60px;
  background-color: var(--blue);
  display: flex;
  padding: 0 5%;
  justify-content: space-between;
  align-items: center;
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
  color: #fff;
  padding: 10px 14px;
}
.nav-link:hover{
  color: var(--grey);
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
  padding: 20px 5%;
}

.form{
  width: 100%;
  padding: 40px;
  box-shadow: var(--form-shadow);
  border-bottom-left-radius: var(--border-radius);
  border-bottom-right-radius: var(--border-radius);
  background-color: #fff;
  max-width: 400px;
  position: relative;
}
.form .icon{
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: var(--blue);
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  border-radius: 50%;
  box-shadow: var(--shadow);
}
.form::before{
  position: absolute;
  width: 100%;
  height: 2px;
  content: '';
  top: -2px;
  left: 0px;
  background-color: var(--blue);
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
  height: 35px;
  padding-left: 35px;
  font-size: 16px;
  color: var(--main-text-color);
  transition: all 0.2s linear;
}

.input-wrapper{
  position: relative;
}

input:focus{
  padding-left: 10px;
  box-shadow: var(--shadow-focus);
}
input + i{
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  transition: all 0.2s linear; 
  color: var(--blue);
}
input:focus + i{
  transform: scale(0);
}
.eye-icon{
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
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
  background-color: var(--blue);
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
  background-color: var(--grey);
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
  background-color: var(--green);
  position: relative;
}
.delete{
  background-color: var(--red);
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
  background-color: var(--grey);
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

/* @media(max-width: 568px){
  .form{
    width: 100%;
  }
  body{
    font-size: 10px;
  }
} */

/*feedback message styles*/
.feedback{
  background-color: var(--red);
  padding: 5px; 
  color: #fff;
  border-radius: var(--border-radius);
  margin-bottom: 10px;
}

.confirm{
  background-color: var(--red);
}
.confirm:hover{
  background-color: #ee514b;
}
.cancel{
  background-color: var(--grey);
  color: #333;
  border: 1px solid #333;
}

.cancel:hover{
  background-color: #ddd;
}

.delete-modal-buttons{
  display: flex;
  justify-content: space-between;
}

.message{
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0px 0px 2px 0px var(--green);
  background-color: #fff;
  color: var(--green);
  padding: 5px 10px;
  border-radius: var(--border-radius);
}
.message p span{
  margin-right: 5px;
}
.message p .fa-check{
  border: 1px solid var(--green);
  border-radius: 50%;
  padding: 3px;
}

/*pagination styles*/
.pagination{
  margin-top: 20px;
  /* text-align: center; */
  display: flex;
  align-items: center;
}
.btn-paginate{
  display: inline-block;
  padding: 5px 10px;
  background-color: transparent;
  /* color: #fff; */
  border-radius: var(--border-radius); 
  cursor: pointer;
  /* margin: 0 5px; */
  font-size: 20px;
}
.btn-paginate:hover{
  background-color: var(--blue);
  color: #fff;
}
.results{
  margin: 0 10px;
}
.per-page{
  margin-right: 10px;
}
/*select options custom*/
.customSelect{
  border-radius: var(--border-radius);
  outline: none;
  border: none;
  box-shadow: var(--shadow);
  padding: 3px;
}
</style>