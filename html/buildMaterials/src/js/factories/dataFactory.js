angular.module('app').factory('dataFactory', function() {
	var service = {},
	data = [
		{
			id:1,
			firstName: 'Mike',
			lastName: 'Rudenko',
			gender:"Male",
			phone:"+380958164741",
			age: 17,
		},
		{
			id:2,
			firstName: 'Mike2',
			lastName: 'Sadovli',
			gender:"Male",
			phone:"+380958164741",
			age: 18,
		},
		{
			id:3,
			firstName: 'Mike3',
			lastName: 'Arakumov',
			gender:"Male",
			phone:"+380958164741",
			age: 25,
		}
	];

	service.getRecords = function() {
		return data;
	};

	service.createRecord = function (firstName,lastName,gender,phone,age) {
		data.push({
			id:data.length+1,
			firstName:firstName,
			lastName:lastName,
			gender:gender,
			phone:phone,
			age:age
		});
	};

	service.deleteRecord = function (record) {
		return _.pull(data,record);
	}

	service.canEditRecord = function(record,id,firstName,lastName,gender,phone,age) {
		var record1 = _.findWhere(data,{id:record.id});
		firstName=record1.firstName;
		lastName=record1.lastName;
		gender=record1.gender;
		phone=record1.phone;
		age=record1.age;
		id=record1.id;
		return {
			id,
			firstName,
			lastName,
			gender,
			phone,
			age,
		}
	}

	service.editRecord = function(id,firstName,lastName,gender,phone,age) {
		var record = _.findWhere(data,{id:id});
		record.id=id;
		record.firstName=firstName;
		record.lastName=lastName;
		record.gender=gender;
		record.phone=phone;
		record.age=age;
	}

	return service;

});