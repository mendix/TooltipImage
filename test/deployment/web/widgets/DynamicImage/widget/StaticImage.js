dojo.provide("DynamicImage.widget.StaticImage");

mendix.widget.declare('DynamicImage.widget.StaticImage', {
	//DECLARATION
	 addons       : [dijit._Templated],
	 templatePath : dojo.moduleUrl('DynamicImage.widget', "templates/DynamicImage.html"), //MWE: use same template
  inputargs: { 
		  imageurl : '',
    defaultImage : '',
    alt : ''
  },
	
  postCreate : function(){
    if (this.imageurl != '')
      this.imageNode.src = this.imageurl;
    else
      this.imageNode.src = this.defaultImage;
    this.actRendered();
  }
});
