(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['loneModal'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"lone-modal\">\n    <div class=\"lone-modal-container\">\n        <div class=\"modal-child\">\n                <canvas width=\"60\" height=\"60\" id='close-modal-btn'></canvas>\n            "
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"loneModal") || (depth0 != null ? lookupProperty(depth0,"loneModal") : depth0)) != null ? helper : container.hooks.helperMissing),(typeof helper === "function" ? helper.call(depth0 != null ? depth0 : (container.nullContext || {}),{"name":"loneModal","hash":{},"data":data,"loc":{"start":{"line":5,"column":12},"end":{"line":5,"column":27}}}) : helper))) != null ? stack1 : "")
    + "        \n        </div>        \n    </div>\n</div>\n\n\n";
},"useData":true});
})();