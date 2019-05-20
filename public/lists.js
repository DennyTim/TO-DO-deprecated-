// Modal window

let modal = document.getElementById('modalAdd');
let btnAdd = document.getElementById('btnAdd');
let span = document.getElementById('closeAdd');

btnAdd.onclick = function() {
	let pos = -100;
	let clear = setInterval(modalAni, 10);
	function modalAni(){
		if (pos < 0) {
			pos+=4;
			modal.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
}

span.onclick = function() {
	let pos = 0;
	let clear = setInterval(modalClose, 10);
	function modalClose(){
		if (pos > -100) {
			pos-=5;
			modal.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
}

window.onclick = function(event) {
	if (event.target == modal) {
		let pos = 0;
		let clear = setInterval(modalClose, 10);
		function modalClose(){
			if (pos > -100) {
				pos-=5;
				modal.style.top = pos + '%';
			} else {
				clearInterval(clear);
			}
		}
	}
}

// Create tile

let btn = document.getElementById('btn');
btn.onclick = function(e) {
	e.preventDefault();
	let pos = 0;
	let clear = setInterval(modalClose, 10);
	function modalClose(){
		if (pos > -100) {
			pos-=5;
			modal.style.top = pos + '%';
		} else {
			clearInterval(clear);
		}
	}
	let list = document.getElementById("list");
	let title = document.getElementById("title").value;
	let desc = document.getElementById("description").value;
	axios
	.post('/lists', {
		title: title,
        description: desc
	}).then(response => {
		console.log(response);
		let needData = response.data[(response.data).length - 1];
		let div = document.createElement("DIV");
		div.className = "tiles-items";
		div.setAttribute("id", needData._id);
	    div.innerHTML = `<h3 class="mb-1 font-weight-bold text-truncate">${needData.title}</h3>
						<p class="mb-1 text-truncate">${needData.description}</p>
						<div class="btn-block-tiles">
							<a class="btn-more" href="/lists/${needData._id}">
								<i class="fas fa-clipboard-list"></i>
							</a>
							<a class="btn-update" href="/updPut/${needData._id}" onclick="updateList(this)">
								<i class="fas fa-pencil-alt"></i>
							</a>
							<a class="btn-delete" href="/del/${needData._id}" onclick="deleteList(this)">x</a>
						</div>
						<form class="form" name="form">
							<input type="text" class="form-control" name="item" placeholder="Enter task">
							<input type="button" class="btn btn-secondary mt-2 mb-2" id="btn" onclick="itemSend(this)" type="button" value="Save">
						</form>`
		list.appendChild(div);
		$('#title').val('').change();
		$('#description').val('').change();
	})
	.catch(error => {
	  console.log(error);
	});
}

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
		let list = document.getElementById("list");
		let item = document.getElementById(id);
		list.removeChild(item);
	})
	.catch(error => {
	  console.log(error);
	});
}

//Update tile

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

// Add list item

let itemSend = (data) => {
	let id = ((data.parentNode).parentNode).id;
	let parent = data.parentNode;
	let child = (data.previousElementSibling);
	axios
	.post(`/api/lists/${id}`, {
		item: child.value
	})
	.then(response => {
		let div = document.createElement("DIV");
		div.className = "d-flex mb-2 list-item";
		div.setAttribute("id", response.data._id);
		div.innerHTML = `<span class="tiles-item-text d-flex flex-grow-1 list-group-item">${response.data.itemObj}</span>
						 <button class="tiles-item-del btn btn-danger btn-xs" onclick="itemDel(this)">
							<i class="far fa-trash-alt"></i>
						</button>`;
		parent.appendChild(div);
		$('.form-control').val('').change();
	})
	.catch(error => {
	  console.log(error);
	});
}

// Delete list item

let itemDel = (data) => {
	event.preventDefault();
	let parent = (((data.parentNode).parentNode).parentNode).id;
	let itemid = (data.parentNode).id;
	let form = ((data.parentNode).parentNode);
	axios
	.put(`/delete/${parent}`, {
		_id: parent,
		itemid: itemid
	})
	.then(response => {
		console.log(response);
		let tilesItem = document.getElementById(parent);
		let items = document.querySelectorAll('.list-item');
		arrItems = [...items];
		arrItems.map(function(index) {
			if(index.id == response.data.itemid){
				form.removeChild(index);
			}
		});
	})
	.catch(error => {
	  console.log(error);
	});
}
