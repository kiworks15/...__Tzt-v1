'use strict'

//можно сделать классом - оберткой над document для удобного создания элементов
let domGenWrapperObject = {
	//arrow function
	createByTag:(tagName, stack)=>{
		let self = this;
		if (!this.elemsStack)
			let elemsStack = [];
		elemsStack.push(document.createElement(tagName));
		//object literals
		return {
			createByTag: self.createByTag,
			elemsStack
		};
	},
	appendChilds:(elements,classes)=>{
		if (elements.length < 2)
			return elements;
		
		let DomRootElem = elements[0];
		DomRootElem.className = classes[0]
		
		//let scope
		for (let i = 1; i < elements.length; i++){
			elements[i].className = classes[i];
			elements[0].appendChild(elements[i]);
		};
		return elements[0];
	}
}

function getAllElementsWithAttribute(attribute)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      // Element exists with attribute. Add to array.
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

//class!
var mInputClassWrapper = function(){
	let _MInputContainerBaseClass;
	
	let _MInputTextElement;

	class MInput {
		constructor(baseClass){
			_MInputContainerBaseClass = baseClass;
			
			this.mInputContainer = this.buildDom(_MInputContainerBaseClass);
			
			_MInputTextElement = this.mInputContainer.getAllElementsWithAttribute('text')[0];
			
			this.mInputContainer.getElementByClassName(".cross").addEventListener('click', (e)=>{this.setTextInputValue("")}, false)
		}
		
		getTextInputValue(){
			return _MInputTextElement.value;
		}
		
		setTextInputValue(newValue){
			_MInputTextElement.value = newValue;
		}
		
		//возможно надо переписть buildDOm так, чтобы он наследовался, но не было повтора для, например, генерации опций комбика
		buildDom(baseClassName){
			//array destructing
			let [inputContainer, input, clearCross] = domGenWrapperObject.createByTag('div').createByTag('input').createByTag('div');
			
			//spread operator
			let appendArgs = [[inputContainer, input, clearCross],baseClassName];
			return domGenWrapperObject.appendChilds(...appendArgs);
		}
	}
}

//из-за обертки проблемка, для наследования надо или переписать обертку или забить на приветные переменные, или вынести как-то класс из обертки
class MSelectInput extends MInput{
    constructor(location, classes, eventListeners){
        super(location, classes, eventListeners);
    }

	/*
    newMtd(){
        return "111";
    }
	*/
	
	/* надо проверить, что будет, если явно не переопределить неизменяемую при наследовании функцию
	listenDom(dom, listeners){
		super(location, classes, eventListeners);
	}
	*/
	
    buildDom(clsasses){
        let baseInputContainer = super(clsasses);
		
		baseInputContainer.appendChild('div');
		//и тд, докрутить до инпута с опциями
    }
}

let initMElements = function(){
	let inputElems = document.getElementsByTagName("m-input");
	let selectInputElems = document.getElementsByTagName("m-select-input");
	let multiSelectInputElems = document.getElementsByTagName("m-multi-select-input");
	
	for (let i = 0; i < inputElems.length; i++){
		let mInput = new (mInputClassWrapper())("blc");
		document.replaceChild(inputElems[i], mInput.mInputContainer);
	}	
};

document.addEventListener('DOMContentLoaded', initMElements, false);