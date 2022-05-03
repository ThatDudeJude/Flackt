(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['joinChannelModal'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channelsList") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":6,"column":24},"end":{"line":38,"column":33}}})) != null ? stack1 : "")
    + "                    \n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "                            <div class=\"channel-list-item\">\n                                <div class=\"chan-item-header\">\n                                    <div class=\"chan-avatar\"></div>\n                                    <div class=\"chan-name-and-topic\">\n                                        <p class=\"chan-name\">\n                                            <h1 class=\"h-4 fs-1\">"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":12,"column":65},"end":{"line":12,"column":80}}}) : helper)))
    + "</h1>\n                                        </p>                                        \n                                        <p class=\"chan-topic\">\n                                            <b>Topic:</b> "
    + alias4(((helper = (helper = lookupProperty(helpers,"channelTopic") || (depth0 != null ? lookupProperty(depth0,"channelTopic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelTopic","hash":{},"data":data,"loc":{"start":{"line":15,"column":58},"end":{"line":15,"column":74}}}) : helper)))
    + "\n                                        </p>\n                                    </div>\n                                </div>\n                                <div class=\"chan-item-descr\">\n                                    <button class=\"btn-secondary description-btn\">More <i class=\"fas fa-caret-down    \"></i></button>\n                                    <div class=\"chan-descr\">\n                                        \n                                        <p class=\"p-1 description\">\n                                            <b>Description:</b>\n                                            "
    + alias4(((helper = (helper = lookupProperty(helpers,"channelDescription") || (depth0 != null ? lookupProperty(depth0,"channelDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelDescription","hash":{},"data":data,"loc":{"start":{"line":25,"column":44},"end":{"line":25,"column":66}}}) : helper)))
    + "</p>\n                                        <div class=\"join-member-total\">\n                                            <div class=\"total-members\">\n                                                <b>Total Members:</b> "
    + alias4(((helper = (helper = lookupProperty(helpers,"totalMembers") || (depth0 != null ? lookupProperty(depth0,"totalMembers") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalMembers","hash":{},"data":data,"loc":{"start":{"line":28,"column":70},"end":{"line":28,"column":86}}}) : helper)))
    + "\n                                            </div>\n                                            <div class=\"join\">\n                                                <button class=\"join-channel-btn btn-secondary\" data-channel=\""
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":31,"column":109},"end":{"line":31,"column":124}}}) : helper)))
    + "\">Join</button>\n                                            </div>\n                                        </div>\n                                    </div>\n                                    \n                                </div>\n                            </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "                <p class=\"no-channels\">\n                    No Channels Available Yet\n                </p>\n\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id=\"channel-list-container\">\n    \n            <h1 class=\"form-heading h-4 fs-1 p-2\">All Channels</h1>\n            <div class=\"channel-list-viewport\">\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channelsList") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":5,"column":16},"end":{"line":45,"column":23}}})) != null ? stack1 : "")
    + "            </div>\n        </div>";
},"useData":true});
})();