class Pledge{
	constructor(fn){
  	this.response;
    this.data;
  	fn((val)=>{
      this.response = 'Success';
      this.data = val;
    },(val)=>{
      this.response = 'Failure';
      this.data = val;
    });
  }

  then(cb){
    let timeout = setInterval(()=>{
    		if(this.response === 'Success'){
        	clearInterval(timeout);
        	cb(this.data);
        }
    },500);
		return this;
  }

  catch(cb){
    let timeout = setInterval(()=>{
    	if(this.response === 'Failure'){
        clearInterval(timeout);
      	cb(this.data);
      }
    },500);
  }
}


let ple = new Pledge((resolve,reject)=>{
	setTimeout(()=>{
    if(true)
        resolve('Success');
     else
        reject('Failure');
  },1000);
});

ple.then(console.log).then((val)=>{
    console.log('Another ' + val);
}).catch(()=>{
	console.log('Failure');
});

/* let ple1 = new Pledge((reject)=>{
  setTimeout(()=>{
      reject('Failure');
  },1000);
});

ple1.then(console.log); */
