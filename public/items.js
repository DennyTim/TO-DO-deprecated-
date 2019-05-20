//Check item

let check = document.querySelectorAll(".custom-control-input");
let btnchek = [...check];

for(let key of btnchek) {
	key.addEventListener('click', function(event){
		let parent = ((((key.parentNode).parentNode).parentNode).parentNode).id;
		let item = key.id;
		let flag;						//тернарка
		if(key.checked){
			flag = true;
		} else {
			flag = false;
		}
		axios
		.put(`/lists/${parent}`, {
			_id: parent,
			itemid: item,
			flag: flag
		})
		.then(response => {
			console.log(response);
		})
		.catch(error => {
		  console.log(error);
		});
	})
}

//Update list

let btnarr = document.querySelectorAll('.btn-update');
let modalUpd = document.getElementById('upd');
let closeMod = document.getElementById('closeMod');
let href = '';
let arrayBtn = [...btnarr];

for(let key of arrayBtn) {
	let name = document.getElementById("name");
	let comment = document.getElementById("comment");
	key.addEventListener('click', function(evt){
		evt.preventDefault();
		href = this.href;
		name.value = this.parentElement.previousElementSibling.previousElementSibling.textContent;
		comment.value = this.parentElement.previousElementSibling.textContent;
		let pos = -100;
		let clear = setInterval(modalAni, 10);
		function modalAni(){
			if (pos < 0) {
				pos+=4;
				modalUpd.style.top = pos + '%';
			} else {
				clearInterval(clear);
			}
		}
	});
}

function updateList(data) {
	event.preventDefault();
	href = data.href;
	let name = document.getElementById("name");
	let comment = document.getElementById("comment");
	name.value = data.parentElement.previousElementSibling.previousElementSibling.textContent;
	comment.value = data.parentElement.previousElementSibling.textContent;
	let pos = -100;
	let clear = setInterval(modalAni, 10);
	function modalAni(){
		if (pos < 0) {
			pos+=4;
			modalUpd.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
}

closeMod.onclick = function() {
	let pos = 0;
	let clear = setInterval(modalClose, 10);
	function modalClose(){
		if (pos > -100) {
			pos-=5;
			modalUpd.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
}


let btnscs = document.querySelector('.btn-success');
btnscs.addEventListener('click', function (evt) {
	evt.preventDefault();
	let pos = 0;
	let clear = setInterval(modalClose, 10);
	function modalClose(){
		if (pos > -100) {
			pos-=5;
			modalUpd.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
	let name = document.getElementById("name").value;
	let comment = document.getElementById("comment").value;
	let id = '';
	console.log(evt);
	id = href.match(/\w{24}$/).join("");
	axios
	.put(`/api/lists/${id}`, {
	  title: name,
	  description: comment
	})
	.then(response => {
		let parent = document.getElementById(id);
		let header = parent.querySelector('h3');
		let desc = parent.querySelector('p');
		header.innerHTML = response.data.title;
		desc.innerHTML = response.data.description;
	})
	.catch(error => {
	  console.log(error);
	});
});

//Delete tile

let btndelArr = document.querySelectorAll('.btn-delete');
btndelArr = [...btndelArr];
for(let key of btndelArr) {
	key.addEventListener("click", deleteList);
}

function deleteList(data) {
	event.preventDefault();
	let id;
	if(data.href !== undefined) {
		id = (data.href).match(/\w{24}$/).join("");
	} else {
		id = (this.href).match(/\w{24}$/).join("");
	}
	axios
	.delete(`/api/lists/${id}`, {
		_id: id
	})
	.then(response => {
		window.location.replace('/list');
	})
	.catch(error => {
	  console.log(error);
	});
}


// Add list item

let itemSend = (data) => {
	let id = ((data.parentNode).parentNode).id;
	let child = (data.previousElementSibling);
	axios
	.post(`/api/lists/${id}`, {
		item: child.value
	})
	.then(response => {
		console.log(response);
		let highElem = document.querySelector(".list-group");
		let div = document.createElement("DIV");
		div.className = "d-flex justify-content-between item-lists custom-control custom-checkbox list-group-item list-group-item-primary";
		div.innerHTML = `
			<input type="checkbox" class="custom-control-input" id="${response.data._id}">
			<label for="${response.data._id}" class="item-lists-fonts custom-control-label">${response.data.itemObj}</label>
			<button class="close-item" onclick="itemDel(this)">&times;</button>`;
		highElem.appendChild(div);
		$('.form-control').val('').change();
	})
	.catch(error => {
	  console.log(error);
	});
}

// Delete list item

let itemDel = (data) => {
	event.preventDefault();
	let parent = (document.querySelector(".position-relative")).id;
	let itemid = data.parentNode.children[0].id;
	let form = ((data.parentNode).parentNode);
	axios
	.put(`/delete/${parent}`, {
		_id: parent,
		itemid: itemid
	})
	.then(response => {
		console.log(response);
		let tile = document.querySelector(".list-group");
		let task = document.getElementById(response.data.itemid);
		tile.removeChild(task.parentNode);
	})
	.catch(error => {
	  console.log(error);
	});
}
