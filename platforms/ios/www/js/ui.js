
var ui = (function() {

    var sum = 0 ;

    return {

    	/* 	This function can be used with input filelds to validate imput simbols one by one.
			It allows only digits and dot to be entered.
			Usage Example:
			  <label class="item item-input"><span class="input-label">Age</span>
  				<input type="text" onkeypress='return ui.allow_only_number(event)'></label>
		*/	
        allow_only_number:function(event) {
            return (event.charCode >= 48 && event.charCode <= 57) 
            || (event.charCode == 45)   // minus
            || (event.charCode == 46)   // dot
            // alert(document.getElementById('textbox_id').value);
        },

        saveAll:function() {

        	  console.log("uidev: ui.saveAll() is executed");

        },

        reset:function() {
            return sum = 0;    
        }  
    }   
}());

