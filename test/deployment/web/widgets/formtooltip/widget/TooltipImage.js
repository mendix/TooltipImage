/*jslint white: true nomen: true plusplus: true */
/*global logger, mx, mxui, mendix, dojo, require, console, define, module, formtooltip */
/**

	formtooltip
	========================

	@file      : TooltipImage.js
	@version   : 1.0
	@author    : Gerhard Richard Edens
	@date      : Thursday, December 4, 2014
	@copyright : Mendix Technology BV
	@license   : Apache License, Version 2.0, January 2004

	Documentation
    ========================
	Describe your widget here.

*/

(function() {
    'use strict';

    // test
    require([

        'mxui/widget/_WidgetBase', 'dijit/_Widget', 'dijit/_TemplatedMixin', 'mxui/widget/Image',
        'mxui/dom', 'dojo/dom', 'dojo/query', 'dojo/dom-prop', 'dojo/dom-geometry', 'dojo/dom-class', 'dojo/dom-style', 'dojo/on', 'dojo/_base/lang', 'dojo/_base/declare', 'dojo/text', 'dojo/dom-attr',
        'formtooltip/widget/FormTooltip'

    ], function (_WidgetBase, _Widget, _Templated, MxuiImage, domMx, dom, domQuery, domProp, domGeom, domClass, domStyle, on, lang, declare, text, domAttr) {

        // Declare widget.
        return declare('formtooltip.widget.TooltipImage', [ _WidgetBase, _Widget, _Templated ], {

            /**
             * Internal variables.
             * ======================
             */
            _dataContent : {},

            baseClass	: "formtooltipTooltipImage",

            // Template path
            templatePath: require.toUrl('formtooltip/widget/templates/TooltipImage.html'),
            
            tooltip		: null,
            viewer		: null,	

            // Update
            update : function(context, callback) {
                logger.debug(this.id + ".applyContext");

                this._dataContent[this.id]._viewer.applyContext(context, function() {});
                
                if (typeof this._dataContent[this.id]._tooltip !== 'undefined' && this._dataContent[this.id]._tooltip !== null) {
                    this._dataContent[this.id]._tooltip.applyContext(context, lang.hitch(this, function(callback) {
                        
                        if (typeof callback !== 'undefined'){
                            callback();
                        }
                        
                    }, callback));
                                                                     
                } else {
                    
                    if (typeof callback !== 'undefined'){
                        callback();
                    }
                    
                }
            },

            applyContext : function(context, callback) {
                logger.debug(this.id + ".applyContext");

                this._dataContent[this.id]._viewer.applyContext(context);
                
                if (typeof this._dataContent[this.id]._tooltip !== 'undefined' && this._dataContent[this.id]._tooltip !== null) {
                    
                    this._dataContent[this.id]._tooltip.applyContext(context, lang.hitch(this, function(callback) {
                        
                        if (typeof callback !== 'undefined'){
                            callback();
                        }
                        
                    }, callback));
                                                                     
                } else {
                       
                    if (typeof callback !== 'undefined'){
                        callback();
                    }
                    
                }

            },

            postCreate : function() {
                var position = null;
                
                logger.debug(this.id + ".postCreate");
                
                this._dataContent[this.id] = {
                    _tooltip		: null,
                    _viewer         : null,
                    _contextObj     : null
                };

                if(/\//.test(this.imagepath)) {
                    this.imagepath = "hack/" + this.imagepath;
                }

                this._dataContent[this.id]._viewer = new MxuiImage({
                    path			: this.imagepath,
                    defaultUrl      : this.imagedefault
                });
                            
                this.domNode.appendChild(this._dataContent[this.id]._viewer.domNode);

                if(this.imagewidth > 0){
                    domAttr.set(this._dataContent[this.id]._viewer.domNode, "width", this.imagewidth + 'px');
                }
                if(this.imageheight > 0){
                    domAttr.set(this._dataContent[this.id]._viewer.domNode, "height", this.imageheight + 'px');
                }
                if(typeof this.imageclick !== 'undefined' && this.imageclick !== ''){
                    this.connect(this._dataContent[this.id]._viewer.domNode, "onclick", dojo.hitch(this, function(evt){
                        mx.data.action({
                            params       : {
                                applyto     : 'selection',
                                actionname  : this.imageclick,
                                guids       : [ this._contextObj.getGuid() ]
                            },
                            callback     : function(obj) {
                                // no MxObject expected
                                console.log("Tooltip image - microflow executed");
                            },
                            error        : function(error) {
                                console.log("Tooltip image - error - " + error.description);
                            },
                            onValidation : function(validations) {
                                console.log("Tooltip image - there were " + validations.length + " validation errors");
                            }
                        });
                    } ));
                }

                switch(this.tooltippos) {
                    case "below":
                        position = ["below", "above"];
                        break;
                    case "above":
                        position = ["above", "below"];
                        break;
                    case "after":
                        position = ["after", "before"];
                        break;
                    case "before":
                        position = ["before", "after"];
                        break;
                }		

                this._dataContent[this.id]._tooltip = new formtooltip.widget.FormTooltip({
                    cssclass	: this.cssclass,
                    position	: position,
                    targetnode	: this._dataContent[this.id]._viewer.domNode,
                    tooltipform	: this.tooltipform,
                    showdelay	: 0,
                    hidedeley   : 0
                });
	
            },

            uninitialize : function() {
                logger.debug(this.id + ".applyContext");

                if (typeof this._dataContent[this.id]._tooltip !== 'undefined' && this._dataContent[this.id]._tooltip !== null){
                    this._dataContent[this.id]._tooltip.destroy();
                }
                if (typeof this._dataContent[this.id]._viewer !== 'undefined' && this._dataContent[this.id]._viewer !== null){
                    this._dataContent[this.id]._viewer.destroy();
                }
            }

        });
    });
    
}());
