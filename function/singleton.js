let SingletonClass = (function() {
	let mName,mNick,mId,mPwd,instance;
	function SingletonClass() {}
	//setter
	this.__defineSetter__("mName",function(val){this.mName=val;});
	this.__defineSetter__("mNick",function(val){this.mNick=val;});
	this.__defineSetter__("mId",function(val){this.mId = val;});
	this.__defineSetter__("mPwd",function(val){this.mPwd = val;});
	this.__defineGetter__("mIdx",function(val){this.mIdx=val;})
	//getter	
	this.__defineGetter__("mName",function(){return mName;});
	this.__defineGetter__("mNick",function(){return mNick;});
	this.__defineGetter__("mId",function(){return mId;});
	this.__defineGetter__("mPwd",function(){return mPwd;});
	this.__defineGetter__("mIdx",function(){return mIdx;})
	return {
		getInstance: function() {
			if(instance == undefined){
			instance = new SingletonClass();
			instance.constructor = null;
			}
			return instance;
		}
	};
})();
