<template>
  <div>
    <Nav/>
    <transition name="router-animation" mode = "out-in" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
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

:root{
  /*boje*/
  --blue: #33b5e5;
  --grey: #f7f7f7;
  --green: #43ac6a;
  --red: #d9534f;
  --text-color: #666666;
  /*borderi i senke*/
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

/*globalni stilovi*/
body{
  font-family: 'Poppins';
  line-height: 1.6;
  min-height: 100vh;
  color: var(--text-color);
  background-color: var(--grey);
}
html{
  font-size: 16px;
}
.container{
  width: 90%;
  margin: auto;
  padding: 20px 0;
  min-height: calc(100vh - 60px);
}

.btn{
  display: inline-block;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
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

/*forme*/
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
  height: 2rem;
  padding-left: 35px;
  font-size: 1rem;
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

/*nav*/
.nav{
  height: 60px;
  background-color: var(--blue);
  display: flex;
  padding: 0 5%;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--shadow);
}
.logo a{
  color: #fff;
  font-size: 1.3rem;
  display: flex;
  align-items: center;
}
.logo a img{
  width: 1.3rem;
  display: inline-block;
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

/*tabela*/
.books-wrapper{
  margin-top: 20px;
}
.book-wrapper h3{
  margin-bottom: 20px;
}
.table-wrapper{
  margin-top: 20px;
  padding-bottom: 30px;
}
#table{
  width: 100%;
  text-align: left;
}
#table thead th{
  border-radius: var(--border-radius);
  background-color: var(--blue);
  color: #fff;
  cursor: pointer;
  user-select: none;
  position: relative;
}
.category-icon{
  position: absolute;
  right: 10px;
  pointer-events: none;
  color: var(--text-color);
}
.category-icon.up{
  top: 15%;
}
.category-icon.down{
  bottom: 15%;
}
.category-icon.active{
  color: #fff;
}
#table td{
  padding: 5px 10px;
  border: 1px solid #999;
  border-radius: var(--border-radius);
}
.modify{
    min-width: 100px;
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

/*skrolbar stilovi*/

::-webkit-scrollbar{
  width: 10px;
  background-color: var(--grey);
  height: 10px;
}
::-webkit-scrollbar-thumb{
  background-color: #888;
  border-radius: 4px;
}

/*modal*/
.modal{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.2);
  padding: 40px;
}
.modal .form{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
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

/*feedback*/
.feedback{
  background-color: var(--red);
  padding: 5px; 
  color: #fff;
  border-radius: var(--border-radius);
  margin-bottom: 10px;
  font-size: 0.9rem;
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

/*stilovi za poruke*/
.message{
  position: fixed;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  background-color:var(--green);
  color: #fff;
  padding: 5px 10px;
  border-radius: var(--border-radius);
  z-index: 100;
  font-size: 0.9rem;
}
.message p span{
  margin-right: 5px;
}
.message p .fa-check{
  border: 1px solid #fff;
  border-radius: 50%;
  padding: 3px;
}

/*stilovi za paginator*/
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
  border-radius: var(--border-radius); 
  cursor: pointer;
  font-size: 1.2rem;
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
/*select stilovi*/
.customSelect{
  border-radius: var(--border-radius);
  outline: none;
  border: none;
  box-shadow: var(--shadow);
  padding: 3px;
}

/*media queries*/
@media(max-width: 992px){
  html{
    font-size: 14px;
  }
}
@media(max-width: 768px){
  html{
    font-size: 12px;
  }
  .form{
    width: 90%;
  }
  .table-wrapper{
    overflow-x: scroll;
    padding:5px 5px 30px 5px;
  }
  #table{
    min-width: 700px;
  }
}
@media(max-width: 576px){
  /*prikaz tabele kao block elementa*/
  #table{
    border-collapse: collapse;
    text-align: center;
    min-width: 200px;
  }
  #table thead tr, #table tbody tr{
    margin-bottom: 20px;
  }
  #table thead th, #table tr, #table td{
    display: block;
    border-radius: 0px;
  }
  #table tbody tr{
    box-shadow: var(--shadow);
    border-radius: 2px;
  }
  #table td{
    border: none;
  }
  #table thead th{
    margin-bottom: 2px;
  }
  .delete,.edit{
    font-size: 10px;
  }
}
</style>