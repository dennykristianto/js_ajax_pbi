function showData(content){
	return value= `
			<div style="background-color:#cecece;margin:10px 0;padding:10px;font-weight:bold">
				<div>Name : ${content.name}</div>
				<div>Date : ${content.date}</div>
				<div>Age : ${content.age}</div>
				<div>Zip : ${content.zip}</div>
				${getPhones()}
			</div>
		`
}

function getPhones(){
	var values = $("input[name='fphone[]']")
              .map(function(){return $(this).val();}).get();
	var listphone="";
	$.each(values,function(key,val){
		if(val!="")
			listphone+=`<div>Phone ${key+1} : ${val}</div>`
	})
	return listphone;
}

function displayErrorMsg(msg){
	$(`#errorbox`).html(msg);
}

$(document).ready(function(){
	$("#myForm").submit(function(event){
		event.preventDefault();
		if($("#fname").val()===''){displayErrorMsg("Name should not be empty");return;}
		if($("#fdate").val()===''){displayErrorMsg("Birthdate should not be empty");return;}
		if(!Date.parse($("#fdate").val())){displayErrorMsg("Birthdate format is invalid");return;}
		if($("#fage").val()===''){displayErrorMsg("Age should not be empty");return}
		if(!$.isNumeric($("#fage").val())){displayErrorMsg("Age should be a number");return}
		if($("#fzip").val()===''){displayErrorMsg("ZIP should not be empty");return}
		if($("#fphone").val()===''){displayErrorMsg("Phone should not be empty");return}
		if(!$.isNumeric($("#fzip").val())){displayErrorMsg("ZIP should be a number");return}
		if(!($("#fzip").val().length=='5')){displayErrorMsg("ZIP should be 5 digits number");return}
		
		var results={
			name:$("#fname").val(),
			date:$("#fdate").val(),
			age:$("#fage").val(),
			zip:$("#fzip").val(),
		}
		
		$("#result").append(showData(results))
		$("#myForm").trigger('reset')
		$("#phoneholder").children().remove();
		$("#phoneholder").append('<input type="text" class="form-control " name="fphone[]"/>')	
	})

	$("#addNumber").click(function(){
		$("#phoneholder").append('<input type="text" class="form-control " name="fphone[]"/>')
	})

	$("#removeNumber").click(function(){
		$("#phoneholder").children().last().remove();
	})
})
