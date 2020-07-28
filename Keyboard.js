//unicode decimal guide: https://www.tamasoft.co.jp/en/general-info/unicode-decimal.html
var keys = Array();
    keys[104]=4613;
    keys[108]=4621;
    keys[72]=4629;
    keys[109]=4637;
    keys[83]=4645;
    keys[114]=4653;
    keys[115]=4661;
    keys[120]=4669;
    keys[75]=4677;
    keys[98]=4709;
    keys[118]=4717;
    keys[116]=4725;
    keys[99]=4733;
    keys[110]=4757;
    keys[71]=4765;
    keys[65]=4773;
    keys[107]=4781;
    keys[119]=4813;
    keys[88]=4821;
    keys[122]=4829;
    keys[74]=4837;
    keys[89]=4845;
    keys[100]=4853;
    keys[106]=4869;
    keys[103]=4877;
    keys[84]=4901;
    keys[67]=4909;
    keys[80]=4917;
    keys[113]=4925;
    keys[81]=4933;
    keys[102]=4941;
    keys[112]=4949;
    
    //a e i o u y
    keys[97] = 4771;
    keys[101] = 4768;
    keys[105] = 4770;
    keys[111] = 4774;
    keys[117] = 4769;
    keys[121] = 4845;

const amharicConsonants = [4613,4621 , 4629, 4637, 4645, 4653, 4661, 4669, 4677, 4709, 4717, 
    4725, 4733, 4757, 4765, 4773, 4781, 4813, 4821, 4829, 4837, 4845, 4853, 4869, 4877, 4901,
    4909, 4917, 4925, 4933, 4941, 4949];

//retrieves a character's unicode value
function _ORD(chr){
    return chr ? chr.charCodeAt(0) : "undefined" ;
}    
//gives more character options when capslock is turned on.
var convertToCapital = Array();
    convertToCapital[4925] = 4933;
    convertToCapital[4933] = 4925;

    convertToCapital[4901] = 4725;
    convertToCapital[4725] = 4901;

    convertToCapital[4917] = 4949;
    convertToCapital[4949] = 4917;

    convertToCapital[4845] = 4772;
    convertToCapital[4772] = 4845;

    convertToCapital[4773] = 4771;
    convertToCapital[4771] = 4773;

    convertToCapital[4645] = 4661;
    convertToCapital[4661] = 4645;

    convertToCapital[4765] = 4877;
    convertToCapital[4877] = 4765;

    convertToCapital[4613] = 4629;
    convertToCapital[4629] = 4613;

    convertToCapital[4837] = 4869;
    convertToCapital[4869] = 4837;

    convertToCapital[4677] = 4781;
    convertToCapital[4781] = 4677;

    convertToCapital[4821] = 4669;
    convertToCapital[4669] = 4821;

    convertToCapital[4909] = 4733;
    convertToCapital[4733] = 4909;

    convertToCapital[4909] = 4733;
    convertToCapital[4733] = 4909;


function _CompoundKeyLayout(baseConsonant){
     
    let keyLayout = [
        "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹" , "፺" , "፻", "፼",   "backspace",
        "", "", "", "", "", "", "", "", "", "፡",
        "caps", "",String.fromCharCode(baseConsonant - 5), String.fromCharCode(baseConsonant - 4), String.fromCharCode(baseConsonant - 3), String.fromCharCode(baseConsonant - 2), String.fromCharCode(baseConsonant - 1), String.fromCharCode(baseConsonant), String.fromCharCode(baseConsonant + 1),  "", "enter",
        "done", "", "", "", "", "", "", "", "፣", "፤", "።",
        "space"
    ];
    return keyLayout;
}    

function _DefaultKeyLayout(){
    let keyLayout = [
        "፩", "፪", "፫", "፬", "፭", "፮", "፯", "፰", "፱", "፲", "፳", "፴", "፵", "፶", "፷", "፸", "፹" , "፺" , "፻", "፼",   "backspace",
        "q", "w", "e", "r", "t", "y", "u", "i", "o", "p",
        "caps", "a", "s", "d", "f", "g", "h", "j", "k", "l", "enter",
        "done", "z", "x", "c", "v", "b", "n", "m", ",", ".", "?",
        "space"
    ];
    return keyLayout;
}    

const Keyboard = {
    elements: {
        main: null,
        keysContainer: null,
        keys: []
    },

    eventHandlers: {
        oninput: null,
        onclose: null
    },

    properties: {
        value: "",
        capsLock: false
    },

    init() {
        // Create main elements
        this.elements.main = document.createElement("div");
        this.elements.keysContainer = document.createElement("div");

        // Setup main elements
        this.elements.main.classList.add("keyboard", "keyboard--hidden");
        this.elements.keysContainer.classList.add("keyboard__keys");
        this.elements.keysContainer.appendChild(this._defaultKeys());

        this._addKeysToDOM();
    },

    _defaultKeys() {
        // console.log('populating default keys');
        this.properties.keyboardType = 'default';
        let fragment = document.createDocumentFragment();
        let keyLayout = _DefaultKeyLayout();
        fragment = this._renderKeyLayout(keyLayout, fragment);
        return fragment;
    },

    _customKeys(baseConsonant){
        // console.log('populating custom keys');
        this.properties.keyboardType = 'custom';
        let fragment = document.createDocumentFragment();
        let keyLayout = _CompoundKeyLayout(baseConsonant);
        fragment = this._renderKeyLayout(keyLayout, fragment);
        return fragment;
    },

    _addKeysToDOM(){
        this.elements.keys = this.elements.keysContainer.querySelectorAll(".keyboard__key");

        // Add to DOM
        this.elements.main.appendChild(this.elements.keysContainer);
        document.body.appendChild(this.elements.main);

        // Automatically use keyboard for elements with .use-keyboard-input
        document.querySelectorAll(".use-keyboard-input").forEach(element => {
            element.addEventListener("focus", () => {
                this.open(element.value, currentValue => {
                    element.value = currentValue;
                });
            });
        });
    },

    _renderKeyLayout(keyLayout, fragment){
        // console.log("renderKeyLayout");
        // console.log('keyLayout' + keyLayout);
        // console.log('fragment' + fragment);
        var paras = document.getElementsByClassName('keyboard__key');

        // Creates HTML for an icon
        const createIconHTML = (icon_name) => {
            return `<i class="material-icons">${icon_name}</i>`;
        };


        while(paras[0]) {
            paras[0].parentNode.removeChild(paras[0]);
        }

        keyLayout.forEach(key => {
            const keyElement = document.createElement("button");
            const insertLineBreak = ["backspace", "p", "enter", "?", "፡","።"].indexOf(key) !== -1;

            // Add attributes/classes
            keyElement.setAttribute("type", "button");
            keyElement.classList.add("keyboard__key");

            switch (key) {
                case "backspace":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("backspace");

                    keyElement.addEventListener("click", () => {
                        this.properties.value = this.properties.value.substring(0, this.properties.value.length - 1);
                        this._triggerEvent("oninput");
                    });

                    break;

                case "caps":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--activatable");
                    keyElement.innerHTML = createIconHTML("keyboard_capslock");

                    keyElement.addEventListener("click", () => {
                        this._toggleCapsLock();
                        keyElement.classList.toggle("keyboard__key--active", this.properties.capsLock);
                    });

                    break;

                case "enter":
                    keyElement.classList.add("keyboard__key--wide");
                    keyElement.innerHTML = createIconHTML("keyboard_return");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += "\n";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "space":
                    keyElement.classList.add("keyboard__key--extra-wide");
                    keyElement.innerHTML = createIconHTML("space_bar");

                    keyElement.addEventListener("click", () => {
                        this.properties.value += " ";
                        this._triggerEvent("oninput");
                    });

                    break;

                case "done":
                    keyElement.classList.add("keyboard__key--wide", "keyboard__key--dark");
                    keyElement.innerHTML = createIconHTML("check_circle");

                    keyElement.addEventListener("click", () => {
                        this.close();
                        this._triggerEvent("onclose");
                    });

                    break;    
    

                //vowels
                case "a":
                case "e":
                case "i":
                case "o":
                case "u":
                    key = keys[_ORD(key)] ? String.fromCharCode(keys[_ORD(key)]) : key;
                    keyElement.textContent = key.toLowerCase();

                    keyElement.addEventListener("click", () => {
                        this.properties.value += this.properties.capsLock ? convertToCapital[_ORD(key)] ? String.fromCharCode(convertToCapital[_ORD(key)]) : key : key;
                        this._triggerEvent("oninput");
                    });

                    break;
                    
                default:
                    // console.log('keyboard Type: ' + this.properties.keyboardType)
                    key = keys[_ORD(key)] ? String.fromCharCode(keys[_ORD(key)]) : key;
                    keyElement.textContent = key.toLowerCase();
                    keyElement.addEventListener("click", () => {
                        // console.log('_ORD(key)' + _ORD(key));
                        // console.log('!amharicConsonants.includes(_ORD(key) ' + !amharicConsonants.includes(_ORD(key)));
                        if(!amharicConsonants.includes(_ORD(key)) || this.properties.keyboardType === 'custom'){ 
                            // console.log('custom keyboard entry')
                            this.properties.value += this.properties.capsLock ? convertToCapital[_ORD(key)] ? String.fromCharCode(convertToCapital[_ORD(key)]) : String.fromCharCode(_ORD(key)) : String.fromCharCode(_ORD(key));
                            this._triggerEvent("oninput");
                        }
                        if(amharicConsonants.includes(_ORD(key)) || this.properties.keyboardType === 'custom'){
                            // console.log('clearing previous keyboard');
                            this.elements.keysContainer.textContent = '';//clearing prevous keyboard
                            this.elements.keysContainer.appendChild(keys[_ORD(key)] !== null && this.properties.keyboardType === 'default' ? this.properties.capsLock && convertToCapital[_ORD(key)]? this._customKeys(convertToCapital[_ORD(key)]) : this._customKeys(_ORD(key)): this._defaultKeys());
                            this._addKeysToDOM();
                            }
                        
                    });

                    break;
            }

            fragment.appendChild(keyElement);

            if (insertLineBreak) {
                fragment.appendChild(document.createElement("br"));
            }
        });

        return fragment;
    },

    _triggerEvent(handlerName) {
        if (typeof this.eventHandlers[handlerName] == "function") {
            this.eventHandlers[handlerName](this.properties.value);
        }
    },

    _toggleCapsLock() {
        this.properties.capsLock = !this.properties.capsLock;
        for (const key of this.elements.keys) {
            if (key.childElementCount === 0) {
                key.textContent = convertToCapital[_ORD(key.textContent)] ? String.fromCharCode(convertToCapital[_ORD(key.textContent)]) : key.textContent;
            }
        }
    },
    

    open(initialValue, oninput, onclose) {
        this.properties.value = initialValue || "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.remove("keyboard--hidden");
    },

    close() {
        this.properties.value = "";
        this.eventHandlers.oninput = oninput;
        this.eventHandlers.onclose = onclose;
        this.elements.main.classList.add("keyboard--hidden");
    }
};

window.addEventListener("DOMContentLoaded", function () {
    Keyboard.init();
});
