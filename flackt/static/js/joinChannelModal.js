(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['joinChannelModal'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channelsList") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":49,"column":15}}})) != null ? stack1 : "")
    + "\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <div class='channel-list-item'>\n          <div class='chan-item-header'>\n            <div class='chan-avatar'>\n              <span style='margin-top: 5px;'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channel_first_letter") || (depth0 != null ? lookupProperty(depth0,"channel_first_letter") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channel_first_letter","hash":{},"data":data,"loc":{"start":{"line":13,"column":45},"end":{"line":13,"column":69}}}) : helper)))
    + "</span>\n            </div>\n            <div class='chan-name-and-topic'>\n              <p class='chan-name'>\n                <h1 class='h-4 fs-1'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":17,"column":37},"end":{"line":17,"column":52}}}) : helper)))
    + "</h1>\n              </p>\n              <p class='chan-topic'>\n                <b>Topic:</b>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"channelTopic") || (depth0 != null ? lookupProperty(depth0,"channelTopic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelTopic","hash":{},"data":data,"loc":{"start":{"line":21,"column":16},"end":{"line":21,"column":32}}}) : helper)))
    + "\n              </p>\n            </div>\n          </div>\n          <div class='chan-item-descr'>\n            <button class='btn-secondary description-btn'>More\n              <i class='fas fa-caret-down'></i></button>\n            <div class='chan-descr'>\n\n              <p class='p-1 description'>\n                <b>Description:</b>\n                "
    + alias4(((helper = (helper = lookupProperty(helpers,"channelDescription") || (depth0 != null ? lookupProperty(depth0,"channelDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelDescription","hash":{},"data":data,"loc":{"start":{"line":32,"column":16},"end":{"line":32,"column":38}}}) : helper)))
    + "</p>\n              <div class='join-member-total'>\n                <div class='total-members'>\n                  <b>Total Members:</b>\n                  "
    + alias4(((helper = (helper = lookupProperty(helpers,"totalMembers") || (depth0 != null ? lookupProperty(depth0,"totalMembers") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"totalMembers","hash":{},"data":data,"loc":{"start":{"line":36,"column":18},"end":{"line":36,"column":34}}}) : helper)))
    + "\n                </div>\n                <div class='join'>\n                  <button\n                    class='join-channel-btn btn-secondary'\n                    data-channel='"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":41,"column":34},"end":{"line":41,"column":49}}}) : helper)))
    + "'\n                  >Join</button>\n                </div>\n              </div>\n            </div>\n\n          </div>\n        </div>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "      <p class='no-channels'>\n        No Channels Available Yet\n      </p>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='channel-list-container'>\n  <h1 class='form-heading h-4 fs-1 p-3'><i\n      class='fas fa-arrow-left previous-modal-from-join'\n    ></i>\n    All Channels\n    <i class='fas fa-arrow-right next-modal-from-join'></i></h1>\n  <div class='channel-list-viewport'>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channelsList") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":8,"column":4},"end":{"line":55,"column":11}}})) != null ? stack1 : "")
    + "  </div>\n</div>";
},"useData":true});
})();