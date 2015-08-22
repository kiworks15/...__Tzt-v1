var domAssistant = (function(){
	//some private variables here

	//todo: length-1 to last function

	function assistant(tagName){
		//assistant.push = [].__proto__.push;
		//assistant.push = Array.prototype.push;
		//assistant.length = 1;

		if (typeof tagName == "string")
			assistant.push(document.createElement(tagName));//assistant[0] = document.createElement(tagName);
		else
			assistant.push(tagName);//assistant[0] = tagName;

		return assistant;
	};

	function lenght(){
		for (let key in assistant){
			console.log(key);
		}


		let keys = assistant.keys();
		let numKeys = keys.find(x => Number.isInteger(x));
		return numKeys.length;
	};

	assistant.push = function(arg){

		assistant[lenght()] = arg;
		/*
		let push = [].push;
		console.dir(push);
		console.dir(assistant);

		assistant.push = [].push;
		console.dir(assistant);
		assistant.push(11);
		let f = {};
		push.call(f, arg);
		push.call(assistant, arg);
		*/
	};

	assistant.createByTag = function(){
		assistant[0] = (document.createElement(tagName));
		return this;
	};

	assistant.appendChild = function(element, content){
		let newElement = document.createElement(element);
		if (content)
			newElement.innerHTML = content;
		assistant[0].appendChild(newElement);
		assistant.push(newElement);
		//elementsCount++;

		return this;
	};

	assistant.lastNodeAppendChild = function(element, content){
		let newElement = document.createElement(element);
		if (content)
			newElement.innerHTML = content;
		assistant[length()-1].appendChild(newElement);
		assistant.push(newElement);
		//elementsCount++;

		return this;
	};
	
	assistant.removeChild = function(element){
		assistant[0].removeChild(element);
		return assistant[0].parentElement;
	};
	
	assistant.getByAttribute = function(attributeName, attributeValue="", element = document){
		//старый код
		/*
		let matchingElements = [];
		let allElements = element.getElementsByTagName('*');
		for (let i = 0, n = allElements.length; i < n; i++){
			if (allElements[i].getAttribute(attribute) !== null){
				  // Element exists with attribute. Add to array.
				  matchingElements.push(allElements[i]);
				}
		}
		*/
		//шаблонные строки
		let matchingElements = element.querySelectorAll(`[${attributeName}="${attributeValue}"]`);
		return matchingElements;
	};

	assistant.getByTagName = function(tagName, element = document){
		let matchingElements = element.querySelectorAll(`${className}`);
		return matchingElements;
	};

	assistant.getByClassName = function(className, element = document){
		//старый код
		/*
		 let matchingElements = [];
		 matchingElements = element.getElementsByClassName(className);
		 */
		//шаблонные строки
		let matchingElements = element.querySelectorAll(`.${className}`);
		return matchingElements;
	};
	
	assistant.addClass = function(className){
		assistant[length()-1].classList.add(className);
		return this;
	};

	assistant.removeClass = function(className){
		assistant[length()-1].classList.remove(className);
		return this;
	};

	assistant.addAttribute = function(attributeName, attributeContent){
		assistant[length()-1].setAttribute(attributeName, attributeContent);
		return this;
	};

	assistant.replace = function(targetElement){
		targetElement.parentNode.replaceChild(elementsStack[0],targetElement);
		return this;
	};

	assistant.appointEvent = function(eventType, eventTarget = assistant[length()-1], eventFunction = function(){}){
		eventTarget[`on${eventType}`] = eventFunction;
		return this;
	};
	
	assistant.disappointEvent = function(eventType, eventTarget = assistant[length()-1]){
		eventTarget[`on${eventType}`] = null;
		return this;
	};
	
	assistant.rewriteCSSRule = function(rule, value){
		assistant[length()-1].style[rule] = `${value}`;
		return this;
	};
	
	assistant.get = function(last){
		if (last)
			return assistant[length()-1];
		return assistant[0];
	};
	
	return assistant;
})();

export default domAssistant;