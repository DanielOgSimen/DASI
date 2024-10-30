<script>

</script>
<div class="imgOneClick">
    <img src="" alt="">
    <div class="OneClickText">
        <div class="input_wrap">
            <input type="text" required />
            <label>Your Name</label>
        </div>
    </div>
</div>
<style>
.input_wrap {
    margin-top: 20rem;
}    

input:focus + label, input:valid + label{
  font-size: 12px;
  top: -5px;
  left:10px;
  background: #ffffff;
  padding: 0px 5px 0px 5px;
}

.input_wrap {width:auto; height:auto; position:relative;
}

.input_wrap label {
  font-family:arial;
  font-size:16px;
  padding: 14px;
  position: absolute;
  top: 0;
  left: 0;
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
  pointer-events: none;

}

input[type="text"]:focus {outline:none;}

</style>