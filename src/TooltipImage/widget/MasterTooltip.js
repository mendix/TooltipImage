/*jslint white: true, nomen: true, plusplus: true */
/*global logger, mx, mxui, mendix, dojo, require, console, define, module, TooltipImage */
define([
	"dojo/_base/declare", "TooltipImage/widget/Templated",
	"dojo/window", "dojo/dom-class", "dojo/dom-geometry",
	"dijit/Tooltip", "dojo/text!TooltipImage/widget/templates/Tooltip.html"
], function(declare, _Templated, dojoWindow, dojoClass, dojoGeometry, dijitTooltip, templateString) {

	var _MasterTooltip = declare([ dijitTooltip._MasterTooltip, _Templated ], {
		declaredClass: "mxui.widget._MasterTooltip",
		constructor: function() {
			this.templateString = templateString;
		},
		show: function(content, aroundNode, position, dv) {
			var cn = this.contentNode;
			var pn = this.prepareNode;

			if (!content) {
				cn.style.display = "none";
				pn.style.display = "block";
			} else {
				cn.style.display = "block";
				pn.style.display = "none";

				if (typeof(content) == "string") {
					cn.innerHTML = content;
				} else if (content.nodeName !== null) {
					while (cn.firstChild) {
						cn.removeChild(cn.firstChild);
					}

					cn.appendChild(content);
				}

				if (dv) {
					dv.resize();

					var box = dojoGeometry.getMarginBox(this.domNode, null),
						view = dojoWindow.getBox();

					if (box.h > view.h) {
						dv.resize({
							h: dojoGeometry.getContentBox(cn.parentNode).h - (box.h - view.h)
						});
					}
				}
			}

			this.domNode.style.display = "";

			// hack to always show, even if current aroundNode is the same are the previous one
			// see dijit/_MasterTooltip.js line 40
			this.aroundNode = null;

			logger.debug("Calling inherited with " + position);
			this.inherited(arguments, [content, aroundNode, position]);
			dojoClass.add(this.domNode, "mx-tooltip");
		}
	});

	return _MasterTooltip;
});
require(["TooltipImage/widget/MasterTooltip"], function () {
	"use strict";
});
