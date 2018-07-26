var gradeBook = {
	_grades: [],
	addGrade: function(newGrade){
		this._grades.push(newGrade);
	},
	getCountOfGrades: function(){
		return this._grades.length;
	},
	getAverage: function(){
		var sum = 0;
		for(var i = 0; i < this._grades.length;i++){
			sum+= this._grades[i];
		}
		
		return sum/this._grades.length;
	},
	
	reset: function(){
		this._grades = [];
	}
};

exports.book = gradeBook;