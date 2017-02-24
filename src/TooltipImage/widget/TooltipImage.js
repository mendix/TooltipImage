/*jslint white: true, nomen: true, plusplus: true */
/*global logger, mx, mxui, mendix, dojo, require, console, define, module, TooltipImage */
/**

	TooltipImage
	========================

	@file      : TooltipImage.js
	@version   : 1.0
	@author    : Gerhard Richard Edens
	@date      : Thursday, December 4, 2014
	@copyright : Mendix Technology BV
	@license   : Apache License, Version 2.0, January 2004

*/

define([
		'dojo/_base/declare', 'mxui/widget/_WidgetBase', 'dijit/_Widget', 'dijit/_TemplatedMixin', 'mxui/dom',
	'dojo/_base/lang', 'dojo/dom-attr', 'dojo/text!TooltipImage/widget/templates/TooltipImage.html', 'TooltipImage/widget/FormTooltip'
], function (declare, _WidgetBase, _Widget, _Templated, MxuiDom, lang, domAttr, widgetTemplate, FormTooltip) {

        // Declare widget.
        return declare('TooltipImage.widget.TooltipImage', [ _WidgetBase, _Widget, _Templated ], {

            /**
             * Internal variables.
             * ======================
             */
            _dataContent : {},

            baseClass	: "formtooltipTooltipImage",

            templateString: widgetTemplate,

            tooltip		: null,
            viewer		: null,

            // Update
            update : function(context, callback) {
                logger.debug(this.id + ".applyContext");

								this._dataContent[this.id]._contextObj = context;

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

								this._dataContent[this.id]._contextObj = context;

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

								var img = mxui.dom.create("img");

								logger.debug("Path='" + this.imagedefault + "'");

								img.src = this.imagedefault;
								img.width = this.imagewidth;
								img.height = this.imageheight;

								this._dataContent[this.id]._viewer = {
									applyContext: function(context) { },
									destroy: function() {
										if (typeof this.domNode !== 'undefined' && this.domNode !== null) {
											this.domnode.destroy();
										}
									}
								};

								this._dataContent[this.id]._viewer.domNode = img;

                this.domNode.appendChild(this._dataContent[this.id]._viewer.domNode);

                if(typeof this.imageclick !== 'undefined' && this.imageclick !== ''){
                    this.connect(this._dataContent[this.id]._viewer.domNode, "onclick", dojo.hitch(this, function(evt){
                        mx.data.action({
                            params       : {
                                applyto     : 'selection',
                                actionname  : this.imageclick,
                                guids       : [ this._dataContent[this.id]._contextObj.getTrackId() ]
                            },
                            callback     : function(obj) {
                                // no MxObject expected
                                logger.debug("Tooltip image - microflow executed");
                            },
                            error        : function(error) {
                                logger.debug("Tooltip image - error - " + error.description);
                            },
                            onValidation : function(validations) {
                                logger.debug("Tooltip image - there were " + validations.length + " validation errors");
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
										case "belowcentered":
                        position = ["below-centered", "above-centered"];
                        break;
                    case "abovecentered":
                        position = ["above-centered", "below-centered"];
                        break;
                    case "aftercentered":
                        position = ["after-centered", "before-centered"];
                        break;
                    case "beforecentered":
                        position = ["before-centered", "after-centered"];
                        break;
										case "belowalt":
                        position = ["below-alt", "above-alt"];
                        break;
                    case "abovealt":
                        position = ["above-alt", "below-alt"];
                        break;
                }

                this._dataContent[this.id]._tooltip = new TooltipImage.widget.FormTooltip({
                    cssclass	: this.cssclass,
                    position	: position,
                    targetnode	: this._dataContent[this.id]._viewer.domNode,
                    tooltipform	: this.tooltipform,
                    showdelay	: 0,
                    hidedeley   : 0
                });

            },

            uninitialize : function() {

                if (typeof this._dataContent[this.id]._tooltip !== 'undefined' && this._dataContent[this.id]._tooltip !== null){
                    this._dataContent[this.id]._tooltip.destroy();
                }
            }

        });
    });
require(["TooltipImage/widget/TooltipImage"], function () {
	"use strict";
});
