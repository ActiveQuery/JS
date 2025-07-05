/*
----------------------
COPYRIGHT NOTICE
---------------------

ActiveQuery JS v25.6.0 
Copyright (c) 2018-Present Syed Kazmi 
License: Open Software License 3.0 (OSL-3.0) 
Author: Syed Kazmi 
URL: https://github.com/ActiveQuery/JS

"ActiveQuery" is synonymous with, and wherever referenced as, "Active Query" or "ActiveQ" or 
"AQ", whether uppercased, lowercased or capitalised. This applies to all parts of 
ActiveQuery namespaces, projects, programmes, repositories, and spaces.

This "ActiveQuery JS" software is released under the terms and conditions of the Open Software 
License version 3.0 (the "License"). Please refer to the License for the specific language 
governing permissions and limitations. You should have received a copy of the License along with 
this source file. If not, visit one of the following links:
 
https://github.com/ActiveQuery/JS/blob/main/LICENSE.txt 
http://opensource.org/licenses/osl-3.0.php

-------------------------------
THIRD PARTY LICENSE/NOTICE
-------------------------------

Array.sortBy Function v1.2.2, Licensed under MIT License
https://github.com/eneko/Array.sortBy

isJSON Function version 2.0.1, Licensed under ISC License
https://github.com/joaquimserafim/is-json

*/


export const ActiveQuery = Object.freeze(class {
           constructor(a = null) {
             this.initlog = [];
             this.DOM = ActiveQuery.DOM;
             this.nestedDOM = ActiveQuery.nestedDOM;
             this.extend = ActiveQuery.extend;
             this.isEmpty = ActiveQuery.isEmpty;
             this.exit = ActiveQuery.exit;
             this.extend = ActiveQuery.extend;
             this.keepOn = ActiveQuery.keepOn;
             if (/[a-z$]/.test(a)) {
               window[a] = ActiveQuery.DOM;
               Element.prototype[`${a + a}`] = ActiveQuery.nestedDOM;
               NodeList.prototype[`${a + a}`] = ActiveQuery.nestedDOM;
               Object.prototype[`${a + a}`] = ActiveQuery.nestedDOM;
             }
             document.addEventListener("readystatechange", n => {
               if ("complete" == n.target.readyState) for (let i = 0; i < this.initlog.length; i++) "function" == typeof this.initlog[i] && this.initlog[i]();
             });
           }
           static DOM(x) {
             let xx;
             xx = document.querySelectorAll(x);
             switch (xx.length) {
	       case 0:
		return null; break;
               case 1:
                 return xx[0]; break;
               default:
                 return xx;
             }
           }
          static nestedDOM(a) {
            // Evaluate all conditions first, no short-circuit
            if(!a || typeof a !== 'string') return this;
            if(!(
              this instanceof Element ||
              this instanceof Document ||
              this instanceof NodeList ||
              this instanceof HTMLCollection
            )) return this;


            // If `this` is a single element or document
              if (this.querySelectorAll) {
                const found = this.querySelectorAll(a);
              return found.length === 0 ? this : (found.length === 1 ? found[0] : found);
            }

            // If `this` is NodeList, HTMLCollection, or array-like
            if (NodeList.prototype.isPrototypeOf(this) || Array.isArray(this)) {
              const results = [];
              for (let i = 0; i < this.length; i++) {
                const el = this[i];
                if (el && el.querySelectorAll) {
                  const found = el.querySelectorAll(a);
                  if (found.length === 1) {
                    results.push(found[0]);
                  } else if (found.length > 1) {
                    for (let j = 0; j < found.length; j++) {
                      results.push(found[j]);
                    }
                  }
                }
              }
              return results.length === 0 ? this : (results.length === 1 ? results[0] : results);
            }

            return this;
          }
           defer(a) {
             let callbacks, time;
             callbacks = [...a];
             time = callbacks.pop() * 1000;
             return setTimeout(callbacks, time);
           }
           static extend(...a) {
             if ("string" == typeof a[0]) {
               switch (a[0].toLowerCase()) {
                 case "dom":
                   if (a[2]
                       .toString()
                       .includes(
                         "class"
                       ) && /^[a-z][a-z-]*[a-z]$/.test(a[1])) {
                     /\bHTMLElement\b/.test(a[2].__proto__.name) && customElements.define(a[1], a[2]);
                     /\bHTML.[a-zA-Z]*Element\b/.test(a[2].__proto__.name) && /^[a-z]*$/.test(a[3]) && customElements.define(
                         a[1],
                         a[2],
                         { extends: a[3] }
                       );
                    
                   }
                   break;
                 case "htmltag":
                   "string" == typeof a[1] && a[2]
                       .toString()
                       .includes(
                         "class"
                       ) && "string" == typeof a[3] && customElements.define(
                       a[1],
                       a[2],
                       { extends: a[3] }
                     );
                   
                   break;
                 case "element":
                   a[1].constructor === Object && Object.defineProperties(Element.prototype, a[1]);
                   break;
                 case "nodelist":
                   a[1].constructor === Object && Object.defineProperties(NodeList.prototype, a[1]);
                   break;
                 case "object":
                   a[1].constructor === Object && Object.defineProperties(Object.prototype, a[1]);
                   break;
                 case "window":
                   a[1].constructor === Object && Object.defineProperties(Window.prototype, a[1]);
                   break;
                 case "array":
                   a[1].constructor === Object && Object.defineProperties(Array.prototype, a[1]);
                   break;
                 case "string":
                   a[1].constructor === Object && Object.defineProperties(String.prototype, a[1]);
                   break;
                 case "number":
                   a[1].constructor === Object && Object.defineProperties(Number.prototype, a[1]);
                   break;
                 case "function":
                   a[1].constructor === Object && Object.defineProperties(Function.prototype, a[1]);
                   break;
                 case "navigator":
                   a[1].constructor === Object && Object.defineProperties(Navigator.prototype, a[1]);
                   break;
                 case "document":  
                  a[1].constructor === Object && Object.defineProperties(Document.prototype, a[1]);
                  break;
                 case "ActiveQ":
                   a[1].constructor === Object && Object.defineProperties(ActiveQuery.prototype, a[1]);
                   break;
                 default:
                  typeof a[1] === 'function' && a[2].constructor === Object && Object.defineProperties(a[1].prototype, a[2]);
                  break;
               }
             }
             return this;
           }

           isArray(a) {
             return !!a && Array.isArray(a);
           }
           isNaA(a) {
             return !(!!a && Array.isArray(a));
           }
           isArraySet(a) {
             return !!a && a instanceof Set;
           }
           isNaAS(a) {
             return !(!!a && a instanceof Set);
           }
           isObjectMap(a) {
             return !!a && a instanceof Map;
           }
           isNaOM(a) {
             return !(!!a && a instanceof Map);
           }
           isArrayLike(a) {
             return !!a && (isArray(a) || isArraySet(a) || isNodeList(a));
           }
           isNaAL(a) {
             return !(!!a && (isArray(a) || isArraySet(a) || isNodeList(a)));
           }
           isString(a) {
             return typeof a === "string" || a instanceof String;
           }
           isNaS(a) {
             return typeof a !== "string" || !(a instanceof String);
           }
           isObject(a) {
             return !!a && a.constructor === Object;
           }
           isNaO(a) {
             return !(!!a && a.constructor === Object);
           }
           isObjectLiteral(a) {
             let props = Object.getOwnPropertyNames(a);
             return !!a && (typeof a === "object" && !["Number", "String", "Boolean", "Symbol"].includes(a.constructor.name) && (!props.includes("length") && !props.includes("prototype") && !props.includes("stringify")));
           }
           isNaM(a) {
             return !(!!a && a instanceof Map);
           }
           isObjectLike(a) {
             return !!a && (isObject(a) || isObjectMap());
           }
           isNaOL(a) {
             return !(!!a && (isObject(a) || isObjectMap()));
           }
           isFunction(a) {
             return !!a && /function|()=>/.test(a.toString());
           }
           isNaF(a) {
             return !(!!a && /function|()=>/.test(a.toString()));
           }
           isClass(a) {
             return !!a && a.toString().includes("class");
           }
           isNaC(a) {
             return !(!!a && a.toString().includes("class"));
           }
           isNodeList(a) {
             return !!a && /\bobject HTML.*Element\b|object HTMLCollection|object NodeList/.test(x.toString());
           }
           isNaNL(a) {
             return !(!!a && /\bobject HTML.*Element\b|object HTMLCollection|object NodeList/.test(x.toString()));
           }
           isSet(a) {
             return !(!Array.isArray(a) || /^\s*$|null|undefined/.test(a));
           }
           isArgument(a) {
             return !/^\s*$|undefined/.test(a);
           }
           isJSON(a) {
             if (/^\s*$|undefined/.test(a) || !/number|object|array|string|boolean/.test(typeof a)) return false;
             return true;
           }
           static isEmpty(a, b = []) {
             if (!Array.isArray(b)) return;
             let conditions = [null, "0", "0.0", false, undefined, ""].filter(x => !b.includes(x));
             if (Array.isArray(a) && a.length > 0) {
               for (let i = 0; i < a.length; i++) {
                 if (ActiveQuery.isEmpty(a[i], b)) return true;
               }
             }
             if (conditions.includes(a) || (["string", "number"].includes(typeof a) && conditions.includes(a
                     .toString()
                     .trim()))) {
               return true;
             }
             return false;
           }
           static exit() {
             return this;
           }
           static keepOn(a) {
             let target = a;
             if (target.length == 0 && !window.debug) {
               return a;
             }
           }
           async getPlugin(n) {
             if ("string" == typeof n) {
               return await import(n);
             }
             return this;
           }
           on(a = null, b = null) {
             if ("string" == typeof a && "function" == typeof b) {
               switch (a) {
                 case "ready":
                   document.addEventListener("DOMContentLoaded", b);
                   break;
                 case "init":
                   window.addEventListener("load", b);
                   break;
                 case "run":
                   window.addEventListener("pageshow", b);
                   break;
                 case "offline":
                   window.addEventListener("offline", b);
                   break;
                 case "online":
                   window.addEventListener("online", b);
                   break;
                 case "close":
                  window.addEventListener('beforeunload', b);
                  break;
               }
             }
             return this;
           }

         });
         if(ActiveQuery.extend) {
          ActiveQuery.extend('array',{
          i : {value:function(a='') {
              if (ActiveQuery.isNaN(a) || ActiveQuery.keepOn(this)) { return this; }
              return this[a];    
          }
          },
          then:{value:function (a){if (typeof a === "function") return a(this);}},
          getIndex:{value:function ( a, b, c ) {
              let x;
              switch (b){
                  case "==":
                      x = this.findIndex(function (obj) {         
                      return obj[a] == c;});
               break;
               case "=":
                  x = this.findIndex(function (obj) {  
                           return obj[a] = c;
                         });
           break;
           } return x;}},
          getCount:{value:function (key, op, val) {
              var count = 0;
              switch (op) {
                  case "==":
                  for (var i = 0; i < this.length; i++) {
                      if (this[i][key] == val) {
                          count++;
                      }
                  }
                  break;
                  case "===":
                          for (var i = 0; i < this.length; i++) {
                              if (this[i][key] === val) {
                                  count++;
                              }
                          }
                          break;
                  case "*":
                          for (var i = 0; i < this.length; i++) {
                              if (this[i][key].includes(val)) {
                                  count++;
                              }
                          }
                          break;            
                          default:
                              var x = val.split(op[1]);
                          for (var i = 0; i < this.length; i++) {
          
                              if (this[i][key]=== x[0] || this[i][key].includes(val)) {
                                  count++;
                              }
                          }
                          break;
              }  
              return count;
          }},
          setSort:{value:function(...a) {
              var keyPaths = [];
          
              var saveKeyPath = function(path) {
                  keyPaths.push({
                      sign: (path[0] === '+' || path[0] === '-')? parseInt(path.shift()+1) : 1,
                      path: path
                  });
              };
          
              var valueOf = function(object, path) {
                  var ptr = object;
                  for (var i=0,l=path.length; i<l; i++) ptr = ptr[path[i]];
                  return ptr;
              };
          
              var comparer = function(a, b) {
                  for (var i = 0, l = keyPaths.length; i < l; i++) {
                      aVal = valueOf(a, keyPaths[i].path);
                      bVal = valueOf(b, keyPaths[i].path);
                      if (aVal > bVal) return keyPaths[i].sign;
                      if (aVal < bVal) return -keyPaths[i].sign;
                  }
                  return 0;
              };
                  
                  for (var i=0,l=a.length; i<l; i++) {
                      switch (typeof(a[i])) {
                          case "object": saveKeyPath(a[i]); break;
                          case "string": saveKeyPath(a[i].match(/[+-]|[^.]+/g)); break;
                      }
                  }
                  return this.sort(comparer);
              }},
              setItem:{value:function ( a, b ) {
                  if(!!a || !!b) return this;
                  this.splice( a, 0, b );
                  return this;
              }},
              has:{value:function (key, val) {
                  for (var i = 0; i < this.length; i++) {
                      if(this[i][key] === val) return true;
                  }
                  return false;
              }},
              getIndexs:{value:function (key, val) {
                  for (var i = 0; i < this.length; i++) {
                      if(this[i][key] === val) return i;
                  }
                  return false;
              }}
      })};
      if(ActiveQuery.extend) {
        ActiveQuery.extend('element',{
    //properties
    parent: { get: function() {
        let parent = this.parentNode.nodeName;
        if (parent === "HTML") return this;
        return this.parentNode;
    }},
    name: { get: function() {
        return this.nodeName;
    }},
    //protos
        setAttributes: {value : function(a) {
            if (!(!!a)) return this;
            let x, c, i;
            x = [...a];
            c = x.length;
            for (i = 0; i < c; i += 2) {
                if (!x[i + 1]) { break; }
                this.setAttribute(x[i], x[i + 1]);
            }
            return this;
        }},
        setAttributeName:{value:function(a) {
            if (ActiveQuery.isEmpty(a)) return this;
            let x, c, i;
            x = [...a];
            c = x.length;
            for (i = 0; i < c; i++) {
                this.setAttribute(x[i], "");
            }
            return this;
        }},
        removeAttributes:{value:function(a) {
            if (ActiveQuery.isEmpty(a)) return this;
            let x, c, i;
            x = [...a];
            c = x.length;
            for (i = 0; i < c; i++) { this.removeAttribute(x[i]); }
            return this;
        }},
        setStyles : {value: function(a) {
            if(ActiveQuery.isEmpty(a)) return this;
            let x, c, i;
            x = [...a];
            c = x.length;
            for (let i = 0; i < c; i++) {
                let split = x[i].replace(" ", "").split(":");
                this.style[split[0]] = split[1];
            }
            return this;
        }},
        getStyles :{value: function(a) {
            if (a) {
                let x, is, c, i, l, ll;
                x = [...a];
                is = false;
                c = x.length;
                if (x[c - 1] == true) {
                    x.pop();
                    is = true;
                };
                c = x.length;
                l = [];
                for (i = 0; i < c; i++) {
                    ll = (is) ? this.style[x[i]] : window.getComputedStyle(this).getPropertyValue(x[i]);
                    if (Boolean(ll)) l.push(ll);
                }
                return l;
            }
            return this;
        }},
        removeStyles : {value: function(a) {
            if(ActiveQuery.isEmpty(a)) return this;
            let x, c, i;
            x = [...a];
            c = x.length;
            for (let i = 0; i < c; i++) {
                this.style.removeProperty(x[i]);
            }
            return this;
        }},
        setClasses:{value: function(a) {
            if (!ActiveQuery.isEmpty(a)) {
                let x, c, i;
                x = [...a];
                c = x.length;
                for (i = 0; i < c; i++) {
                    this.classList.add(x[i]);
                }
            }
            return this;
        }},
        getClasses : {value:function(a) {
            let t = this,x;
            if (!ActiveQuery.isEmpty(a)) {
                x = [...a];
                  return x.every(function(e) {
                    return t.classList.contains(e);
                });
            }
            return t.classList.toString().split(" ");
        }},
        removeClasses :{value: function(a) {
            if (!ActiveQuery.isEmpty(a)) {
                let x, c, i;
                x = [...a];
                c = x.length;
                for (i = 0; i < c; i++) {
                    this.classList.remove(x[i].trim());
                }
            }
            return this;
        }},
        toggleClasses:{value: function(a) {
            if (!ActiveQuery.isEmpty(a)) {
                this.classList.toggle(a);
            }
            return this;
        }},
        i : {value:function() { return this; }},
        setChild :{ value:function(a) {
            if (Array.isArray(a)) {
                let c = a.length,i;
                for (i = 0; i < c; i++) {
                    this.appendChild(a[i]);
                }
            } else { this.appendChild(a); }
            return this;
        }},
        siblings :{value:function(a) {
            let t = this;
            switch (a) {
                case "next":
                    return t.nextElementSibling;
                    break;
                case "prev":
                    return t.previousElementSibling;
                    break;
                default:
                    let list = Array.from(target.parentNode.children).filter(function(value) {
                            return value !== t;
                        })
                    return list;
            }
        }},
        setAdjacent :{value:function(a,b) {
        if(!!a||!!b ) return this;
        switch (a) {
            case "atstart":
            case "before":
            this.insertAdjacentElement("beforebegin", b);
                break;
            case "atend":
            case "after":
                   this.insertAdjacentElement("afterend", b);
                break;
            case "atbegin":
            case "first-item":
                   this.insertAdjacentElement("afterbegin", b);
                break;
            case "atclose":
            case "last-item":
                   this.insertAdjacentElement("beforeend", b);
                break;
        }
        return this;
        }},
        setHtml :{value: function(a, b=false) {
            if (!!a) return this;
            return (b) ? this.outerHTML = a: this.innerHTML = a;
            
        }},
        getHtml :{value: function(a, b=false) {
            if (a) { return (b) ? this.outerHTML.indexOf(a) >= 0 : this.innerHTML.indexOf(a) >= 0; };
            return this.innerHTML;
        }},
        setContent :{value: function(a) {
            if (Array.isArray(a)) {
                this.innerHTML= "";
                let c = a.length, i;
                for (i = 0; i < c; i++) {
                    this.appendChild(a[i]);
                }
            } else {  this.innerHTML= ""; this.appendChild(a); }
            return this;
        }},
       
        setText: {value: function(a) {
            if (a) { this.textContent = a; };
            return this;
        }},
        getText :{value:function(a) {
            if (a) { return this.textContent.indexOf(a) >= 0; };
            return this.textContent;
        }},
              // import module for side effects
        setValue :{value: function (a){
            if ('value' in this && !!a) {
            this.value = a;} else {this.value = ""};
            return this;
            }},
        getValue :{value: function (a,b=false){
            if ('value' in this && !!a) {
            if (!b) { return this.value.indexOf(a) >= 0; }
            else if (b) { return Boolean(this.value.indexOf(a)); };
            return this.value;
            } return this;
                }},        
        then:{value:function (a){if (typeof a === "function") return a(this);}},
        fax:{ value:function() {if (this.nodeName !== "FORM") return this;}},
       
    });
    } 
    if(ActiveQuery.extend) {
   	 ActiveQuery.extend('element',{
        on:{value:function(a, b) {if(typeof a !== "string" ||typeof b !== "function") return this;
      this.addEventListener(a, b); return this; }}
    });
ActiveQuery.extend('document',{
        on:{value:function(a, b) {if(typeof a !== "string"  ||typeof b !== "function") return this;
        this.addEventListener(a, b); return this; }}    
    });

ActiveQuery.extend('window',{
        on:{value:function(a, b) {if(typeof a !== "string"  ||typeof b !== "function") return this;
        this.addEventListener(a, b); return this; }}    
    });

};
if(ActiveQuery.extend) {
  ActiveQuery.extend('function',{
      then:{value:function (a){if (typeof a === "function") return a(this);}},
  });
};
if(ActiveQuery.extend) {
  ActiveQuery.extend('nodelist',{
//properties
parent: { get: function(){return this;}},
name: { get: function(){return this;}},
//protos
  setAttributes: {value : function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (i = 0; i < c; i++) {
          for (ii = 0; ii < cc; ii += 2) {
              if (!x[ii + 1]) { break; }
              this[i].setAttribute(x[ii], x[ii + 1]);
          }
      }
      return this;
  }},
  setAttributeName:{value:function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (i = 0; i < c; i++) {
          for (ii = 0; ii < cc; ii++) {
              this[i].setAttribute(x[ii], "");
          }
      }
      return this;
  }},
  removeAttributes:{value:function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (i = 0; i < cc; i++) { for (ii = 0; ii < c; ii++) { this[ii].removeAttribute(x[i]); } }
      return this;
  }},
  setStyles :{value: function(a) {
      if (ActiveQuery.keepOn(this)|| ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (ii = 0; ii < cc; ii++) {
          let split = x[ii].replace(" ", "").split(":");
          for (i = 0; i < c; i++) {
              this[i].style[split[0]] = split[1];
          }
      }
      return this;
  }},
  getStyles: {value: function (){return;}},
  removeStyles :{value: function(a) {
      if (ActiveQuery.keepOn(this)|| ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (ii = 0; ii < cc; ii++) {
          for (i = 0; i < c; i++) {
              this[i].style.removeProperty(x[ii]);
          }
      }
      return this;
  }},

  setClasses:{value: function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (i = 0; i < c; i++) {
          for (ii = 0; ii < cc; ii++) {
              this[i].classList.add(x[ii]);
          }
      }
      return this;
  }},
  getClasses:{ value:function() {return this;}},
  removeClasses : {value:function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let x, c, cc, i, ii;
      x = [...a];
      c = this.length;
      cc = x.length;
      for (i = 0; i < c; i++) {
          for (ii = 0; ii < cc; ii++) {
              this[i].classList.remove(x[ii]);
          }
      }
      return this;
  }},
  toggleClasses:{value:function(a) {
      if (ActiveQuery.keepOn(this) || ActiveQuery.isEmpty(a)) return this;
      let c, i;
      c = this.length;
      for (i = 0; i < c; i++) {
          this[i].classList.toggle(a.trim());
      }
      return this;
  }},

  i : {value:function(a='') {
      if (isNaN(a) || ActiveQuery.keepOn(this)) { return this; }
      return this[a];    
  }
  },
  setChild :{ value:function(){return this;}},
  siblings : {value:function(a) {
      if (ActiveQuery.keepOn(this)) { return this; };
      let t = this[0];
      switch (a) {
          case "next":
              return t[0].nextElementSibling;
              break;
          default:
              let target = t[0];
              let list = Array.from(target.parentNode.children).filter(function(value) {
                  return value !== t;
              });
              return list;
      }
  }},
  setAdjacent :{ value:function(){return this;}}, 
  setHtml :{ value:function(){return this;}},
  getHtml :{ value:function(){return this;}},
  setContent :{ value:function(){return this;}},
  setText :{ value:function(){return this;}},
  getText :{ value:function(){return this;}},
  setValue :{value:function (a) {
      if (ActiveQuery.keepOn(this)) return this;
      let c, i;  c = this.length;
      for (i = 0; i < c; i++) {if ('value' in this[i]) {if (a) {this[i].value = a;} else {this[i].value = ""};}
      } return this;
       }}, 
  getValue:{ value:function(){return this;}},
  then:{value:function (a){if (typeof a === "function") return a(this);}},
  on:{value:function(a, b) {
      if(ActiveQuery.isEmpty(a) ||ActiveQuery.isEmpty(b)) return;
      let c = this.length, i;
      for (i = 0; i < c; i++) { this[i].addEventListener(a, b); }
      return this;
  }},
  fax:{ value:function(){return this;}},

});
};
if(ActiveQuery.extend) {
  ActiveQuery.extend('number',{
  trim : {value:function(charlist=null) {
      if (typeof this !== "number") { return this; }
      let str=this;
      let whitespace = [
          ' ',
          '\n',
          '\r',
          '\t',
          '\f',
          '\x0b',
          '\xa0',
          '\u2000',
          '\u2001',
          '\u2002',
          '\u2003',
          '\u2004',
          '\u2005',
          '\u2006',
          '\u2007',
          '\u2008',
          '\u2009',
          '\u200a',
          '\u200b',
          '\u2028',
          '\u2029',
          '\u3000'
        ].join('');
        let l = 0
        let i = 0
        str += ''
        if (charlist) {
          whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
        }
        l = str.length
        for (i = 0; i < l; i++) {
          if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
          }
        }
        l = str.length
        for (i = l - 1; i >= 0; i--) {
          if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break
          }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
      }


  }})};
  if(ActiveQuery.extend) {
    ActiveQuery.extend('object',{
//protos
    setValues: {value : function (a,b, c=false){
        if (ActiveQuery.isNaO(this) ||!!a||!!b) return this;
        if(!c && this[a]) return;
            this[a] = b;
        return this;
        }},
    hasValues:{value : function (a){
        if (ActiveQuery.isNaO(this) ||!!a) return this;
        return (this[a]);
        }},     
});
};
if(ActiveQuery.extend) {
  ActiveQuery.extend('string',{
  trim : {value:function(charlist=null) {
      if (typeof this !== "string") { return this; }
      let str=this;
      let whitespace = [
          ' ',
          '\n',
          '\r',
          '\t',
          '\f',
          '\x0b',
          '\xa0',
          '\u2000',
          '\u2001',
          '\u2002',
          '\u2003',
          '\u2004',
          '\u2005',
          '\u2006',
          '\u2007',
          '\u2008',
          '\u2009',
          '\u200a',
          '\u200b',
          '\u2028',
          '\u2029',
          '\u3000'
        ].join('');
        let l = 0
        let i = 0
        str += ''
        if (charlist) {
          whitespace = (charlist + '').replace(/([[\]().?/*{}+$^:])/g, '$1')
        }
        l = str.length
        for (i = 0; i < l; i++) {
          if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i)
            break
          }
        }
        l = str.length
        for (i = l - 1; i >= 0; i--) {
          if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1)
            break
          }
        }
        return whitespace.indexOf(str.charAt(0)) === -1 ? str : ''
      }


  }})};
  if(ActiveQuery.extend ) {
    if(!Element.prototype.sancha){}
    ActiveQuery.extend('element',{
      sancha:{value:function(argss){
        if (!argss) return this;
        let args = argss || {}
        if(args.static) {
            if (!args.template) {args.template = this.innerHTML;} else {args.template = args.template;}
            if(args.swap){
                this.innerHTML = args.template;
                 } else { this.insertAdjacentHTML('beforeend',args.template );
                }
                  return this;
        }
         if (!args.data || args.data.length < 1  || args.data === undefined) { this.insertAdjacentHTML('beforeend',"No Data found" ); return this};
      if (!args.template) {args.template = this.innerHTML;} else {args.template = args.template;}
      let xd ="";
      args.list = args.template.match(/([^}{]+)(?=})/g);
      args.mapping = {};
      args.vap = {};
      for (ii = 0; ii < args.data.length; ii++) {
      if(args.variable) { args.variable(this, args.data, args.template); }
          
            for (i = 0; i < args.list.length; i++) {
              if (args.list[i].includes("$")){args.vap["{{".concat(args.list[i], "}}")] = variables[args.list[i].replace("$", "")]; 
              } 
              else {
               args.mapping["{{".concat(args.list[i], "}}")] = args.data[ii][args.list[i]];}
         
                 }
            
      let xs = args.template.replace(/\{{\w+\}}/g, function (a) {
        let x = args.mapping[a]; 
         
            return x;
          }).replace(/\{{\$\w+\}}/g, function (a) {
       
            let  x = args.vap[a]; 
       
            return x;
          });
      
      xd +=xs;
         
      }
      if(args.swap){
        this.innerHTML = xd;
      } else {
        this.insertAdjacentHTML('beforeend',xd );
        
      }
      if(args.then){
      if(typeof args.then == 'function'){
        args.then();
        
         }
        }
      
      return this;
      }}
  });
  if(!NodeList.prototype.sancha){ActiveQuery.extend('nodelist',{
    sancha:{value:function(){return this; }}});};
  if(!Object.prototype.sancha){ActiveQuery.extend('object',{
    sancha:{value:function(){return this; }}});};
  };
  if(ActiveQuery.extend) {
    if(!Element.prototype.sift){
      ActiveQuery.extend('element',{
        sift:{ value:function(a){
            if (!!a) return this;
            let t, l, c, i, x, xx;
            t = this;
            t.onkeyup = function (){   
                x = (t.tagName === "INPUT") ?  t.value.toUpperCase() : t.textContent.toUpperCase();
                if (x.trim() ==="") {return t;}
                l = document.querySelectorAll(a);
                c = l.length;
                if (x.trim() =="*") {
                  for (i = 0; i < c; i++) {
                      l[i].classList.remove("hide");
                    }
                  return t;
                } else {
                  for (i = 0; i < c; i++) {
                    xx =   l[i].getAttribute("sift") || l[i].textContent || l[i].innerText;
                    if (xx.toUpperCase().indexOf(x.trim()) > -1) {
                      l[i].classList.remove("hide");
                    } else {
                      l[i].classList.add("hide");
                    }
                    }
                }
            }
        return t;
        }}
        });};
    
  if(!NodeList.prototype.sift) {
    ActiveQuery.extend('nodelist',{
    sift:{value:function(){return this; }}});
  };
  if(!Object.prototype.sift) {
    ActiveQuery.extend('object',{
    sift:{value:function(){return this; }}});
  };
  };
  if(ActiveQuery.extend) {
    if(!Element.prototype.watch){
        if (!MutationObserver) {
            (function(undefined) {
                window.MutationObserver = window.MutationObserver || function(t) {
                    
                    "use strict";
        
                    function e(t) { this._watched = [], this._listener = t }
        
                    function a(t) {
                        ! function a() {
                            var r = t.takeRecords();
                            r.length && t._listener(r, t), t._timeout = setTimeout(a, e._period)
                        }()
                    }
        
                    function r(e) { var a = { type: null, target: null, addedNodes: [], removedNodes: [], previousSibling: null, nextSibling: null, attributeName: null, attributeNamespace: null, oldValue: null }; for (var r in e) g(a, r) && e[r] !== t && (a[r] = e[r]); return a }
        
                    function n(t, e) {
                        var a = s(t, e);
                        return function(n) {
                            var i, u = n.length;
                            e.charData && 3 === t.nodeType && t.nodeValue !== a.charData && n.push(new r({ type: "characterData", target: t, oldValue: a.charData })), e.attr && a.attr && o(n, t, a.attr, e.afilter), (e.kids || e.descendents) && (i = l(n, t, a, e)), (i || n.length !== u) && (a = s(t, e))
                        }
                    }
        
                    function i(t, e) { return e.value }
        
                    function u(t, e) { return "style" !== e.name ? e.value : t.style.cssText }
        
                    function o(t, e, a, n) { for (var i, u, o = {}, l = e.attributes, s = l.length; s--;) i = l[s], u = i.name, n && !g(n, u) || (m(e, i) !== a[u] && t.push(r({ type: "attributes", target: e, attributeName: u, oldValue: a[u], attributeNamespace: i.namespaceURI })), o[u] = !0); for (u in a) o[u] || t.push(r({ target: e, type: "attributes", attributeName: u, oldValue: a[u] })) }
        
                    function l(e, a, n, i) {
                        function u(t, a, n, u, s) { for (var d, c, h, f = t.length - 1, p = -~((f - s) / 2); h = t.pop();) d = n[h.i], c = u[h.j], i.kids && p && Math.abs(h.i - h.j) >= f && (e.push(r({ type: "childList", target: a, addedNodes: [d], removedNodes: [d], nextSibling: d.nextSibling, previousSibling: d.previousSibling })), p--), i.attr && c.attr && o(e, d, c.attr, i.afilter), i.charData && 3 === d.nodeType && d.nodeValue !== c.charData && e.push(r({ type: "characterData", target: d, oldValue: c.charData })), i.descendents && l(d, c) }
        
                        function l(a, n) {
                            for (var h, f, g, v, b, m, y, D = a.childNodes, N = n.kids, V = D.length, _ = N ? N.length : 0, k = 0, S = 0, w = 0; S < V || w < _;) m = D[S], b = N[w], y = b && b.node, m === y ? (i.attr && b.attr && o(e, m, b.attr, i.afilter), i.charData && b.charData !== t && m.nodeValue !== b.charData && e.push(r({ type: "characterData", target: m, oldValue: b.charData })), f && u(f, a, D, N, k), i.descendents && (m.childNodes.length || b.kids && b.kids.length) && l(m, b), S++, w++) : (s = !0, h || (h = {}, f = []), m && (h[g = c(m)] || (h[g] = !0, -1 === (v = d(N, m, w)) ? i.kids && (e.push(r({ type: "childList", target: a, addedNodes: [m], nextSibling: m.nextSibling, previousSibling: m.previousSibling })), k++) : f.push({ i: S, j: v })), S++), y && y !== D[S] && (h[g = c(y)] || (h[g] = !0, -1 === (v = p(D, y, S)) ? i.kids && (e.push(r({ type: "childList", target: n.node, removedNodes: [y], nextSibling: N[w + 1], previousSibling: N[w - 1] })), k--) : f.push({ i: v, j: w })), w++));
                            f && u(f, a, D, N, k)
                        }
                        var s;
                        return l(a, n), s
                    }
        
                    function s(t, e) { var a = !0; return function r(t) { var n = { node: t }; return !e.charData || 3 !== t.nodeType && 8 !== t.nodeType ? (e.attr && a && 1 === t.nodeType && (n.attr = f(t.attributes, function(a, r) { return e.afilter && !e.afilter[r.name] || (a[r.name] = m(t, r)), a }, {})), a && (e.kids || e.charData || e.attr && e.descendents) && (n.kids = h(t.childNodes, r)), a = e.descendents) : n.charData = t.nodeValue, n }(t) }
        
                    function d(t, e, a) { return p(t, e, a, v("node")) }
        
                    function c(t) { try { return t.id || (t[D] = t[D] || y++) } catch (e) { try { return t.nodeValue } catch (a) { return y++ } } }
        
                    function h(t, e) { for (var a = [], r = 0; r < t.length; r++) a[r] = e(t[r], r, t); return a }
        
                    function f(t, e, a) { for (var r = 0; r < t.length; r++) a = e(a, t[r], r, t); return a }
        
                    function p(t, e, a, r) {
                        for (; a < t.length; a++)
                            if ((r ? t[a][r] : t[a]) === e) return a;
                        return -1
                    }
        
                    function g(e, a) { return e[a] !== t }
        
                    function v(t) { return t }
                    e._period = 30, e.prototype = {
                        observe: function(t, e) {
                            for (var r = { attr: !!(e.attributes || e.attributeFilter || e.attributeOldValue), kids: !!e.childList, descendents: !!e.subtree, charData: !(!e.characterData && !e.characterDataOldValue) }, i = this._watched, u = 0; u < i.length; u++) i[u].tar === t && i.splice(u, 1);
                            e.attributeFilter && (r.afilter = f(e.attributeFilter, function(t, e) { return t[e] = !0, t }, {})), i.push({ tar: t, fn: n(t, r) }), this._timeout || a(this)
                        },
                        takeRecords: function() { for (var t = [], e = this._watched, a = 0; a < e.length; a++) e[a].fn(t); return t },
                        disconnect: function() { this._watched = [], clearTimeout(this._timeout), this._timeout = null }
                    };
                    var b = document.createElement("i");
                    b.style.top = 0, b = "null" != b.attributes.style.value;
                    var m = b ? i : u,
                        y = 1,
                        D = "mo_id";
                    return e
                }(void 0);
            }).call('object' === typeof window && window || 'object' === typeof self && self || 'object' === typeof global && global || {});
        };  
        ActiveQuery.extend('element',{
            watch :{value: function(argus) {
                var args, target, config, observer;
                args = argus || {},
                target = args.element || this;
                observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        this.watched = mutation.target;         
                        args.then();
                     
                    });
                });
                config = { subtree: args.subtree || false, attributes: args.attribute || false, childList: args.children || false, characterData: args.values || false, attributeFilter: args.filter }
                return observer.observe(target, config);
            }}
                });

    }
   
    if(!NodeList.prototype.watch){
        ActiveQuery.extend('nodelist',{
            watch:{value:function(){return this; }}});
    }
    if(!Object.prototype.watch){
        ActiveQuery.extend('object',{
            watch:{value:function(){return this; }}});
    }
    };  