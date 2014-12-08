dojo.provide("DynamicImage.widget.MobileStaticImage");

dojo.declare('DynamicImage.widget.MobileStaticImage', mobile.widget._Widget, {
	imageurl : '',
	defaultImage : '',
	alt : '',
	_hasStarted : false,

	startup : function(){
		if (this._hasStarted)
			return;

		this._hasStarted = true;

		this.domNode.appendChild(
			mobile.dom.create("img", {
				src : (this.imageurl != '')?this.imageurl:this.defaultImage,
				alt : this.alt
			})
		);
		
		this.actLoaded(function (){}); // temp. fix for a client issue, should be fixed in 4.4
	}
});
