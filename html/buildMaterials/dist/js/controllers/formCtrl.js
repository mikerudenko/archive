angular.module('app').controller('formCtrl', function(dataFactory){
	this.isEditing = false;
	this.editingCard = null;

	this.sortType     = 'name'; // значение сортировки по умолчанию
	this.sortReverse  = false;  // обратная сортировка
	this.searchFish   = '';     // значение поиска по умолчанию


	this.deleteRecord = function(record) {
		this.isEditing = false;
		dataFactory.deleteRecord(record);
	}

	this.getRecords = function() {
		return dataFactory.getRecords();
	}

	this.canEditRecord = function(record){
		this.isEditing = true;
		var recordEdit=dataFactory.canEditRecord(record,this.id,this.firstName,this.lastName,this.gender,this.phone,this.age);
		this.firstName=recordEdit.firstName;
		this.lastName=recordEdit.lastName;
		this.gender=recordEdit.gender;
		this.phone=recordEdit.phone;
		this.age=recordEdit.age;
		this.id=recordEdit.id;
	}

	this.editRecord = function() {
		if(this.firstName && this.lastName && this.gender && this.phone && this.age) {
			dataFactory.editRecord(this.id,this.firstName,this.lastName,this.gender,this.phone,this.age);
			this.firstName=this.lastName=this.gender=this.phone=this.age='';
			this.isEditing = false;
		} else {
			alert('Write correct information!')
		}
	}

	this.createRecord = function() {
		if(this.firstName && this.lastName && this.gender && this.phone && this.age) {
			dataFactory.createRecord(this.firstName,this.lastName,this.gender,this.phone,this.age);
			this.firstName=this.lastName=this.gender=this.phone=this.age='';
		} else {
			alert('Write correct information!')
		}
	};
});