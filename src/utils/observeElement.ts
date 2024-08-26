export default (selector: string, callback: Function, continuous = false) => {
	let elementExists = false;
	try{
		const timer = setInterval(() => {
			const element = document.querySelector(selector);
			if(element && !elementExists) {
				elementExists = true;
				callback();
			}
			else if(!element) elementExists = false;
			if(element && !continuous) {
				clearInterval(timer);
			}
		}, 100);
	} catch(e){
		console.log(e);
	}
};