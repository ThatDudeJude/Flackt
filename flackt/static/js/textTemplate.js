(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['textTemplate'] = template({"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div class='text-info "
    + alias4(((helper = (helper = lookupProperty(helpers,"sender") || (depth0 != null ? lookupProperty(depth0,"sender") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sender","hash":{},"data":data,"loc":{"start":{"line":1,"column":22},"end":{"line":1,"column":32}}}) : helper)))
    + "'>\n  <div class='sender-info'>\n    <div class='profile-pic'>\n      <span style='margin-top: 5px;'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"sender_first_letter") || (depth0 != null ? lookupProperty(depth0,"sender_first_letter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sender_first_letter","hash":{},"data":data,"loc":{"start":{"line":4,"column":37},"end":{"line":4,"column":60}}}) : helper)))
    + "</span>\n    </div>\n    <p class='sender-name'> "
    + alias4(((helper = (helper = lookupProperty(helpers,"name") || (depth0 != null ? lookupProperty(depth0,"name") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"name","hash":{},"data":data,"loc":{"start":{"line":6,"column":28},"end":{"line":6,"column":36}}}) : helper)))
    + " </p>\n  </div>\n  <div class='sender-text'>\n    <p class='text'>"
    + ((stack1 = ((helper = (helper = lookupProperty(helpers,"text") || (depth0 != null ? lookupProperty(depth0,"text") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text","hash":{},"data":data,"loc":{"start":{"line":9,"column":20},"end":{"line":9,"column":30}}}) : helper))) != null ? stack1 : "")
    + "</p>\n  </div>\n  <div class='text-date'>\n    <p class='date'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"text_time") || (depth0 != null ? lookupProperty(depth0,"text_time") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"text_time","hash":{},"data":data,"loc":{"start":{"line":12,"column":20},"end":{"line":12,"column":33}}}) : helper)))
    + "</p>\n  </div>\n  <svg class='svg-"
    + alias4(((helper = (helper = lookupProperty(helpers,"sender") || (depth0 != null ? lookupProperty(depth0,"sender") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"sender","hash":{},"data":data,"loc":{"start":{"line":14,"column":18},"end":{"line":14,"column":28}}}) : helper)))
    + "'></svg>\n</div>";
},"useData":true});
})();