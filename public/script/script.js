// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
    'use strict'
  
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.needs-validation')
  
    // Loop over them and prevent submission
    Array.from(forms).forEach(form => {
      form.addEventListener('submit', event => {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
  
        form.classList.add('was-validated')
      }, false)
    })
  })()


  //tax displaying

  let TaxSwitch=document.getElementById("flexSwitchCheckReverse");
  TaxSwitch.addEventListener("click",()=>{
      let tax=document.getElementsByClassName("tax-info");
      for(info of tax){
        if(info.style.display != "inline"){
            info.style.display="inline";}
        else{
          info.style.display="none";
        }
      }
  });

  document.addEventListener('DOMContentLoaded', function() {
    const filters = document.querySelectorAll('.filter');
    const taxToggle = document.getElementById('flexSwitchCheckReverse');
    
    // Add click event listeners to filters
    filters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all filters
            filters.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked filter
            this.classList.add('active');
            
            // Navigate to filtered listings
            window.location.href = `/listings/category/${category}`;
          });
      });
    });