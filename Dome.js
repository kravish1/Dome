;(function(global){
    var Dome = function(selector){
        return new Framework(selector);
    }
    
    Dome.prototype = {
        map : function(callback){
            var result = [];
            for(var i=0;i<this.length;i++){
                result.push(callback.call(this,this[i]));
            }
            return result;
        },
        forEach : function(callback){
            this.map(callback);
            return this;
        },
        mapOne : function(callback){
            var m = this.map(callback);
            return m.length > 1 ? m : m[0];
        },
        text : function(){
            var m = this.mapOne(function(el){
                return el;
            });
            
            return m.innerText;
        },
        addClass : function(classes){
            var className = "";
            if(typeof classes !== 'string'){
                for(var i=0;i<classes.length;i++){
                    className += " " + classes[i];
                }
            }
            else{
                
                className = " " + classes;
                
            }
           return this.forEach(function(el){
                
               el.className += className;
            });
        },
        removeClass : function(classname){
            var classes = [];
            return this.forEach(function(el){
               classes = el.className.split(' ');
               classes.splice(classes.indexOf(classname),1);
               
                el.className = classes.join(' '); 
            });
        }
        
    }
    
    Framework = function(selector){
        var els;
        if(typeof selector === 'string'){
            els = document.querySelectorAll(selector);
        }
        else if(selector.length){
            els = selector;
        }
        else{
            els = [selector];
        }
        
        for(var i=0;i<els.length;i++){
            this[i] = els[i];
        }
        this.length = els.length;
    }
    
    Framework.prototype = Dome.prototype;
    console.dir(Framework);
    global.Dome = global.D$ = Dome;
})(window);