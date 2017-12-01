var numbers = [5, 6, 2, 3, 7];
var obj = {numbers:[6,8,9,10]}

/* using Math.min/Math.max apply */
var max = Math.max.apply(null, obj.numbers); /* This about equal to Math.max(numbers[0], ...) or Math.max(5, 6, ..) */
var min = Math.min.apply(null, numbers);
//console.log(obj);
console.log(max,min);

     function Person(name,age)
     {
          this.name=name;
          this.age=age;
          this.say = function(){
          	console.log(this.name);
          }
      }
      /*定义一个学生类*/
      function Student(name,age,grade)
     {
         Person.apply(this,arguments);
         this.grade=grade;
     }
     //创建一个学生类
     var student=new Student("qian",21,"一年级")
     student.say();
     console.log(student);

     var arr1 = [1,2,3,4,5];
     var arr2 = [5,6];
     Array.prototype.push.apply(arr1,arr2);
     //console.log([].push(arr1));
     console.log