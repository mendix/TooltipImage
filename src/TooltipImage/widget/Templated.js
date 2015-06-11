/*jslint white: true, nomen: true, plusplus: true */
/*global logger, mx, mxui, mendix, dojo, require, console, define, module, TooltipImage */
define([
	"dijit/_TemplatedMixin",
	"dojo/_base/declare"
], function(_TemplatedMixin, declare) {
	var _Templated = declare(_TemplatedMixin, {
		destroyRendering: function() {
			// Avoid dijit._AttachMixin._detachTemplateNodes
			// to remove the references to dojo attach points.
			this._attachPoints = [];
			this.inherited(arguments);
		} 
	});

	return _Templated;
});