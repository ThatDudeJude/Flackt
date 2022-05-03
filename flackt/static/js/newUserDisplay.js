(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['newUserDisplay'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"modal-first-time-user\">    \n    <div id=\"modal-container\">\n    <div id=\"modal-1\" class=\"modal-display\">\n    <form action=\"\" id=\"getDisplayName\" class=\"modal-contents\">\n        <h1 class=\"form-heading h-4 fs-1 p-2\">Enter Your Flackt Display Name</h1>\n        <div class=\"form-row p-2\">\n            <label for=\"displayName\">\n                Name&colon;\n            <input type=\"text\" autocomplete=\"off\" placeholder=\"Enter Display Name\" id=\"displayName\">\n            </label>\n        </div>\n        <div class=\"message p-1 fs-0\" >\n            \n        </div>        \n        <div class=\"form-row p-2\">\n            <input class=\"btn-primary\" type=\"submit\" value=\"Accept\">\n        </div>                \n    </form>    \n</div>\n\n<div id=\"modal-2\" class=\"modal-display\">\n    <div class=\"p-4\" id=\"channel-create-or-pick\">\n        <button id=\"new-user-create-channel\" class=\"btn-primary\">Create Channel</button>\n        <h4>Or</h4>\n        <button id=\"new-user-join-channel\" class=\"btn-primary\">Join Channel</button>\n    </div>\n</div>\n<div id=\"modal-3\" class=\"modal-display create-channel-modal\">\n\n    "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"createNewChannel") || (depth0 != null ? lookupProperty(depth0,"createNewChannel") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"createNewChannel","hash":{},"data":data,"loc":{"start":{"line":32,"column":4},"end":{"line":32,"column":26}}}) : helper))) != null ? stack1 : "")
    + "\n    \n</div>    \n    <div id=\"modal-4\">\n        "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"pickChannelFromList") || (depth0 != null ? lookupProperty(depth0,"pickChannelFromList") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"pickChannelFromList","hash":{},"data":data,"loc":{"start":{"line":36,"column":8},"end":{"line":36,"column":33}}}) : helper))) != null ? stack1 : "")
    + "\n        \n    </div>\n    </div>\n</div>\n</div>\n</div>\n\n";
},"useData":true});
})();