const mainPage = require('../app/modules/main-page/main');
const addNote = require('../app/modules/notes/create/addNote');
const updateNote = require('../app/modules/notes/update/updateNote');
const deleteNote = require('../app/modules/notes/delete/deleteNote');

const addList = require('../app/modules/list/addList');
const updList = require('../app/modules/list/updList');
const delList = require('../app/modules/list/delList');
const getListMore = require('../app/modules/list/getListMore');

const addListItem = require('../app/modules/list/addListItem');
const delListItem = require('../app/modules/list/delListItem');
const checkListItem = require('../app/modules/list/checkListItem');

module.exports = (app, db) => {
    mainPage(app, db);
    addNote(app, db);
    updateNote(app, db);
    deleteNote(app, db);
	/*List*/
	addList(app, db);
	updList(app, db);
	delList(app, db);
	getListMore(app, db);
	/*ListItems*/
	addListItem(app, db);
	delListItem(app, db);
	checkListItem(app, db);
}
