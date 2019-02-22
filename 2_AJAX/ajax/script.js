var allData = [];

var loopData = function () {
	var searchField = $('#search').val();
	var myExp = new RegExp(searchField, "i");
	var output = '<ul class="searchresults">';
	$.each(allData, function(key, val) {
		if(val.name.match(myExp) || val.bio.match(myExp)){
			var name=val.name.replace(myExp,`<span style='color:red;background:yellow'>${val.name.match(myExp)}</span>`);
			var bio=val.bio.replace(myExp,`<span style='color:red;background:yellow'>${val.bio.match(myExp)}</span>`);
			output += `
				<li class="myli" id="item">
					<h2>${name}</h2>
					<img src="images/${val.shortname}_tn.jpg" alt="${val.name}"/>
					<button id="delbtn${key}" onClick="deldata(${key})"> delete </button>
					<button onClick="edit(${key})"> edit </button>
					<div id="editarea${key}" style="display:none">
						<textarea style="width:600px;height:50px" id="txtedit${key}">${val.bio}</textarea>
						<button onClick=save(${key})>save</button>
						<button onClick="edit(${key},false)">cancel</button>
					</div>
					<p id="bio${key}">${bio}</p>
					<br/>
				</li>
			`;
		}
	});
	
	output += '</ul>';
	$('#update').html(output);
}

function save(id){
	allData[id].bio=$(`#txtedit${id}`).val();
	loopData();
}

function deldata(id){
	allData.splice(id,1);
	loopData();
}

function edit(id){
	$(`#editarea${id}`).show();
	$(`#bio${id}`).hide();
	$(`#delbtn${id}`).hide();
}

$.getJSON('data.json', function(data) {
	allData = data;
	loopData();
});

$(document).ready(function(){
	$("#search").on('keyup',function(){
		loopData();
	})
})