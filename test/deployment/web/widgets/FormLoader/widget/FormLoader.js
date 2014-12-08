dojo.provide("FormLoader.widget.FormLoader");

mxui.widget.declare('FormLoader.widget.FormLoader', {
	addons       : [mendix.addon._Contextable],
    inputargs: {
		formPath : '',
		wWidth : 0,
        animate: false,
        sharednodeid : '',
        //preempty : true,
        requirescontext : true,
        fixedHeight : 0,
        maxHeight : 0,
		listenchannel : '',
        jumptotop : false,
        cacheforms : false
    },
	
    loaderStates : {}, //shared among all.
    cachedForms : {},
    hasContext : false,
    formObj : null,    
    currentNode : null,
    isFormLoading : false,
	hasStarted : false,
    
    getTargetNode : function() {
        return this.sharednodeid === ''? this.domNode : dojo.byId(this.sharednodeid);
    },
    
    subHandler : null,
	startup : function(){
		if (!this.hasStarted) {
			this.hasStarted = true;
			dojo.style(this.domNode, 'width', this.wWidth === 0 ? '':this.wWidth);
			if (this.listenchannel !== '')
				this.subHandler = dojo.subscribe((this.getContent() + "/"+this.listenchannel+"/context"), dojo.hitch(this, this.receivedContext));
			
			this.updateNode();
			
			if (this.requirescontext)
				this.initContext();
		}
        this.actLoaded();
	},
	
    _createContext : function (obj) {
        var context = this.createContext();
        context.setContext(obj.getClass(), obj.getGUID());
        return context;
    },

	receivedContext : function (obj) {
        if (this.isFormLoading || dojo.marginBox(this.domNode.parentNode.parentNode).h === 0)
            return;
		
        if (obj) {
            mxui.dom.show(this.domNode);
            if (this.animate) {
                var node = this.getTargetNode();
                //dojo.style(node, 'opacity', 1);
            }
			var context = this._createContext(obj);
            this.hasContext = true;
            if (this.formObj && obj != undefined) {
                this.loadContext(obj);
            } else if (this.formObj) {
                /*
                Ignore this as the loading might take really long and we want to show the new object!
                Leads to unexpected behavior when combined with the Navigation Loader which marks the active object
                */

                //this.isFormLoading = true; 
                this.loadContext();
            } else
			    this.openForm(obj);
            
            if (this.jumptotop) {
                var content = dojo.query('.dijitContentPane');
                for (var i = 0; i < content.length; i++) {
                    content[i].scrollTop = 0;
                }
                scroll(0,0);
            }
		} else {
            //Empty... 
            if (this.formObj) {
                if (this.animate) {
                    var node = this.getTargetNode();
                    var anim = dojo.animateProperty({
                        node : node,
                        duration : 175,
                        properties : {
                            'opacity' : 0
                        },
                        onEnd : dojo.hitch(this, function() {
                            this.formObj.destroy();
                            this.formObj = null;
                            mxui.dom.hide(this.domNode);
                        })
                    }).play();
                } else {
                    this.formObj.destroy();
                    this.formObj = null;
                    mxui.dom.hide(this.domNode);
                }
            }
        }
	},

    formObjVisible : function () {
        if (this.formObj) {
            var pos = dojo.position(this.formObj.domNode);
            // This can happen if you have a nested form loader.
            // These don't receive the proper uninitialize call which means the formObj is never destroyed.
            // 
            return pos.h > 0;
        } else {
            return false;
        }
    },
    
    update : function(obj, callback){
        if (this.listenchannel === '') {
            if (obj && obj.getGUID()) {
                var context = this._createContext(obj);
                this.cloneContext(context);
                this.hasContext = true;
            } else {
                this.hasContext = false;
                this.mxcontext = null;
            }
            if (this.formObj && this.formObjVisible()) {
                this.receivedContext(obj);
            } else {
                this.openForm(obj);
            }
        }
        callback && callback();
    },
	
    //loads the real content
	openForm : function (obj) {
        if (this.requirescontext && !this.hasContext)
            return; //not ready yet, ignore call
        
        var node = this.getTargetNode();
        
        if (this.formPath === '') {
            dojo.empty(node);
            dojo.style(node, 'display', 'none');
            this.unsetCache();
        }
        else {
            dojo.style(node, 'display', '');
            if (!this.cacheforms && this.formObj ) {
                try {
                    if (!this.isFormLoading)
                        this.formObj.destroyRecursive();
                    else {
                        console.warn('Form is still loading..!');
                    }
                } catch (e) {
                    console.warn('FormLoader: Destroy form unsuccessful.');
                }
            }
            //state matches the request?
            if (this.sharednodeid != '' && this.loaderStates[this.sharednodeid] && this.loaderStates[this.sharednodeid].formPath == this.formPath) {
                this.formObj = this.loaderStates[this.sharednodeid].formObj;
                // After 6 times loading the form, it seems to be cleaned up by the client
                // So we have to rebuild it again...
                // null check for some cases   //this happens in IE               // this happens in FF
                if (!this.formObj.domNode || !this.formObj.domNode.innerHTML || !this.formObj.domNode.parentNode) 
                    this.loadFormHelper(node);
                else {
                    this.updateNode();
                    this.loadContext(obj); //we already have the proper form
                }
            }
            
            //not the active state, but, form is in cache
            else if (/*this.sharednodeid != '' && */this.cachedForms[this.formPath] && this.cacheforms) { 
                this.formObj = this.cachedForms[this.formPath];
                this.loaderStates[this.sharednodeid] = {
                    formPath : this.formPath,
                    context : null, //MWE: TODO, context might be already the proper one?
                    formObj : this.formObj
                };
                dojo.empty(node);
                // After 6 times loading the form, it seems to be cleaned up by the client
                // So we have to rebuild it again...
				// null check for some cases   //this happens in IE               // this happens in FF
                if (!this.formObj || !this.formObj.domNode || !this.formObj.domNode.innerHTML || !this.formObj.domNode.parentNode) 
                    this.loadFormHelper(node);
                else {
                    dojo.place(this.formObj.domNode.parentNode, node);
                    this.updateNode();
                    this.loadContext(obj);
                }
            }
            
            else
                this.loadFormHelper(node, obj);
        }
    }, 
    
    loadFormHelper : function(node, obj) {
        //cached nowhere, load the form. MWE: somehow, applyContext is triggerd twice often...
        if (!this.isFormLoading) {
            this.isFormLoading = true;
            var contentid = this.id+(+ new Date());
            var ioBind = mxui.lib.putContent(this.formPath, {content_id : contentid}, node);
    
            ioBind.addErrback(function(err) {
                console.error("FormLoader widget could not load the form: "+err);
            });
            
            ioBind.addCallback(dojo.hitch(this, function() {
                // Tab container has its dijit node deeper then a dataview. This should keep it versatile.
                var formNode = dojo.query(".mendixFormView", node)[0];
                this.formObj = formNode ? dijit.byNode(formNode) : null;
                
                //cache the current state & form
                if (this.cacheforms) {
                    if (this.sharednodeid !== '')
                        
                        this.loaderStates[this.sharednodeid] = {
                            formPath : this.formPath,
                            context : null,
                            formObj : this.formObj
                        };
                    this.cachedForms[this.formPath] = this.formObj;
                }
                this.updateNode();
                
                this.loadContext(obj);
            }));
        }
	},

    findNode : function (node) {
        return node.childNodes[0];
    },
    
    loadContext : function (obj) {
        if (this.requirescontext) {
            if (this.sharednodeid != '' && this.loaderStates[this.sharednodeid] && this.loaderStates[this.sharednodeid].context == this.mxcontext.getActiveGUID()) {
                //console.info("Reusing context");
                this.isFormLoading = false;
                return;
            } else if (obj) {
                var ctxt = this.createContext();
                //ctxt.setTrackObject(this.mxcontext.getTrackObject()); // Breaks in 3.1
                ctxt.setContext(obj.getClass(), obj.getGUID());

                this.formObj.applyContext(ctxt, dojo.hitch(this, function() {
                    this.isFormLoading = false;
                    if (this.scrollTop) {
                        var content = dojo.query('.dijitContentPane');
                        for (var i = 0; i < content.length; i++) {
                            content[i].scrollTop = 0;
                        }
                        scroll(0,0);
                    }
                }));
                
                if (this.sharednodeid !== '' &&  this.loaderStates[this.sharednodeid]) { //update cache
                    
                    this.loaderStates[this.sharednodeid].context = obj.getGUID();
                }
            }
            else {
                var ctxt = this.createContext();
                //ctxt.setTrackObject(this.mxcontext.getTrackObject()); // Breaks in 3.1
                ctxt.setContext(this.mxcontext.getActiveClass(), this.mxcontext.getActiveGUID());

                this.formObj.applyContext(ctxt, dojo.hitch(this, function() {
                    this.isFormLoading = false;
                    if (this.scrollTop) {
                        var content = dojo.query('.dijitContentPane');
                        for (var i = 0; i < content.length; i++) {
                            content[i].scrollTop = 0;
                        }
                        scroll(0,0);
                    }
                }));
                
                if (this.sharednodeid !== '' &&  this.loaderStates[this.sharednodeid]) { //update cache
                    
                    this.loaderStates[this.sharednodeid].context = this.mxcontext.getActiveGUID();
                }
            }
        } else if (this.formObj) {
            var ctxt2 = this.createContext();
            this.formObj.applyContext(ctxt2, dojo.hitch(this, function() {
                this.isFormLoading = false;
                if (this.scrollTop) {
                    var content = dojo.query('.dijitContentPane');
                    for (var i = 0; i < content.length; i++) {
                        content[i].scrollTop = 0;
                    }
                    scroll(0,0);
                }
            }));
        }
	},    
    
    //set basic layout which does not depend on the actual form
    updateNode : function() {
        var node = this.getTargetNode();
        if (this.animate) {
            dojo.style(node, 'opacity', 0);
            var anim = dojo.animateProperty({
                node : node,
                duration : 175,
                properties : {
                    'opacity' : 1
                }
            }).play();
        }
        if (this.formPath === '' || this.fixedHeight !== 0)
            dojo.style(node, 'height', this.fixedHeight+ 'px');
        else
            dojo.style(node, 'height', '');
        
        try {
            if (node.childNodes.length > 0) //apply new class beforehand
                dojo.attr(node.childNodes[0], 'class', dojo.attr(this.domNode, 'class'));
        }
        catch(e) {
            //
        }
        
    },
    
    resumed : function() {
        if (this.sharednodeid != '') {
            this.updateNode();
        
            if (!this.requirescontext) {
                this.openForm(null);
            }
            else if (this.hasContext && this.mxcontext && this.mxcontext.getActiveGUID()) {
                mx.processor.get({
                    guid : this.mxcontext.getActiveGUID(),
                    callback : dojo.hitch(this, function(obj) {
                        this.updateNode();
                        this.openForm(obj);
                    })
                });            
            }
        }    
    },

    getTargetNode : function() {
        var n = this.sharednodeid === ''? this.domNode : dojo.byId(this.sharednodeid);
        if (!n)
            throw this.id + " no target node found!";
        return n;        
    },
    
    unsetCache : function() {
        if (this.sharednodeid != '' && this.loaderStates[this.sharednodeid])
            this.loaderStates[this.sharednodeid] = undefined;
    },
    
	uninitialize : function(){
        try {
            this.subHandler && dojo.unsubscribe(this.subHandler);
            this.formObj && this.formObj.destroyRecursive();
            //MWE: remove form or not? Keeping it in Mem might be nice and fast?
        }
        catch(e) {
            console.warn("Error while disposing: " +e );
        }
	}
});;