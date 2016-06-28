(function($){

		(function($) {
		  var defaultoptions={};
		  var plugname = "qcarrousel";
		  $.fn[plugname] = function() {
		    var isMethodCall = arguments.length > 0 && typeof arguments[0] === "string";
		    if (isMethodCall) {

		      var methodname = arguments[0];
		      var args = Array.prototype.slice.call(arguments, 1);
		      this.each(function() {
		        var instance = $.data(this, plugname);
		        if (instance && $.isFunction(instance[methodname])) {
		          var method = instance[methodname];
		          method.apply(instance, args);
		        }
		      });
		    } else {
		      var inputoptions = arguments;
		      $(this).each(
		        function() {
		          var optionsnew = $.extend({}, defaultoptions);
		          if (inputoptions.length > 0) {
		            optionsnew = $.extend(optionsnew, inputoptions[0]);
		          }
		          var instance = $(this).data(plugname);
		          if (instance) {
		            instance.init(optionsnew);
		          } else {
		            var target = $(this);
		            instance = new PluginObject(target);
		            instance.init(optionsnew);
		            $(this).data(plugname, instance);
		          }
		        }
		      );
		      return this;
		    };
		  }


/*
 *1.定时执行动画
 *2.鼠标移动到dot上，清除定时器
 *3.移动开添加定时器
 */

		  function PluginObject(target) {
		  	var self=this;
		    self.curindex = 0;
		    self.preindex = 0;
		    self.items = [];
		    self.dots =[];
		    var iterval;
		    self.showIndex=function(index)
		    {

		      var oldele=$(self.items.get(self.preindex)); 
			  var olddotele=$(self.dots.get(self.preindex));
			  olddotele.removeClass("active");
			  oldele.stop().animate({"opacity":"0"},500,function f()
			  {
			  		$(self.dots.get(index)).addClass("active");
		  	  		self.preindex=index;
			  });
			  $(self.items.get(index)).show().stop().animate({"opacity":"1"},500,function f2(){
			  		//setTimeout(self.start, 5000);
		  	  });
		    };
		    self.autoRun = function() {
		      if (self.curindex >= self.items.size()-1) {
		        self.curindex=0;
		      } else {
		        self.curindex++;
		      }
			  self.showIndex(self.curindex);
		    };
		    self.startAutoRun=function()
		    {
		    	iterval=setInterval(self.autoRun,2000);	
		    };
 			self.stopAutoRun=function()
		    {
		    	clearInterval(iterval);
		    };
		    self.init = function() {
		      self.items = target.find(".item");
		      self.dots = target.find(".dot");
		      self.dots.on("mouseenter",function(event)
		      {
		     	self.stopAutoRun();
		      	self.showIndex(self.dots.get().indexOf(event.target));
		      }).on("mouseleave",function(){
		      	self.startAutoRun();
		      });
		      self.showIndex(0);
		      self.startAutoRun();
		    };


		  }

		  
		})(jQuery);

})(jQuery);
